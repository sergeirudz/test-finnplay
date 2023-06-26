import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CookieOptions, Request, Response } from 'express';
import { TokenService } from './token.service';
import { MoreThanOrEqual } from 'typeorm';
import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from 'src/config/config';

const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(ACCESS_TOKEN_EXPIRES_IN * 60 * 1000),
  maxAge: ACCESS_TOKEN_EXPIRES_IN * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax',
};

const refreshTokenCookieOptions: CookieOptions = {
  expires: new Date(REFRESH_TOKEN_EXPIRES_IN * 60 * 1000),
  maxAge: REFRESH_TOKEN_EXPIRES_IN * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax',
};

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  @Post('register')
  async register(@Body() body: any) {
    if (body.password !== body.password_confirm) {
      throw new BadRequestException('Passwords do not match');
    }

    return this.userService.save({
      username: body.username,
      password: await bcryptjs.hash(body.password, 12),
    });
  }

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res({
      passthrough: true,
    })
    response: Response,
  ) {
    const user = await this.userService.findOne({ username });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    if (!(await bcryptjs.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    const access_token = await this.jwtService.signAsync(
      { id: user.id },
      {
        expiresIn: '30s',
      },
    );

    const refresh_token = await this.jwtService.signAsync({ id: user.id });

    const expired_at = new Date();
    expired_at.setDate(expired_at.getDate() + 7);
    await this.tokenService.save({
      user_id: user.id,
      token: refresh_token,
      expired_at,
    });

    response.status(200);

    response.cookie('access_token', access_token, accessTokenCookieOptions);
    response.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
    response.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    return {
      username: user.username,
      logged_in: true,
      access_token: access_token,
      refresh_token: refresh_token,
    };
  }

  @Get('user')
  async user(@Req() request: Request) {
    try {
      const accessToken = request.headers.authorization.split(' ')[1];
      const { id } = await this.jwtService.verifyAsync(accessToken);

      const { password, ...data } = await this.userService.findOne({ id });

      return data;
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  @Post('refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const refreshToken = request.cookies.refresh_token;

      const { id } = await this.jwtService.verifyAsync(refreshToken);

      const tokenEntity = await this.tokenService.findOne({
        user_id: id,
        expired_at: MoreThanOrEqual(new Date()),
      });

      if (!tokenEntity) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const accessToken = await this.jwtService.signAsync(
        { id },
        {
          expiresIn: '30s',
        },
      );

      response.status(200);
      return {
        token: accessToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  @Get('logout')
  async logout(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    await this.tokenService.delete({ token: request.cookies.refresh_token });
    response.clearCookie('refresh_token');
    response.clearCookie('access_token');
    response.clearCookie('logged_in');
    return {
      message: 'success',
    };
  }
}
