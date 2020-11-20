import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RenderInterceptor } from './render.interceptor';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, {provide: APP_INTERCEPTOR, useClass: RenderInterceptor}],
})
export class AppModule {}
