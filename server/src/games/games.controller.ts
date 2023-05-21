import { Controller, Get, Res } from '@nestjs/common';

import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Controller('games')
export class GamesController {
  @Get()
  async getGames(@Res() res: Response): Promise<any> {
    const file = createReadStream(join(process.cwd(), 'data.json'));
    file.pipe(res);
  }
}
