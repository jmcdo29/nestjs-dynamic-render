import { Controller, Get, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @SetMetadata('FILE_NAME', 'index.hbs')
  getHello(): Record<string, any> {
    return this.appService.getHello();
  }
}
