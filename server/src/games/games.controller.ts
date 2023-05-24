import { Controller, Get, Res, UseGuards } from '@nestjs/common';

import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('games')
export class GamesController {
  @Get()
  @UseGuards(AuthGuard)
  async getGames(@Res() res: Response): Promise<any> {
    const file = createReadStream(join(process.cwd(), 'data.json'));
    file.pipe(res);
  }
}
