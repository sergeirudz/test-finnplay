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
import { Request, Response } from 'express';
import { TokenService } from './token.service';
import { MoreThanOrEqual } from 'typeorm';

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

    const accessToken = await this.jwtService.signAsync(
      { id: user.id },
      {
        expiresIn: '30s',
      },
    );

    const refreshToken = await this.jwtService.signAsync({ id: user.id });

    const expired_at = new Date();
    expired_at.setDate(expired_at.getDate() + 7);
    await this.tokenService.save({
      user_id: user.id,
      token: refreshToken,
      expired_at,
    });

    response.status(200);
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1w
    });

    return {
      token: accessToken,
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

  @Post('logout')
  async logout(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    await this.tokenService.delete({ token: request.cookies.refresh_token });
    response.clearCookie('refresh_token');
    return {
      message: 'success',
    };
  }
}
