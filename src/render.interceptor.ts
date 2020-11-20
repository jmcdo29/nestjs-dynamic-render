import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { readFileSync } from 'fs';
import * as handlebars from 'handlebars';
import { join } from 'path';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RenderInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const file = this.reflector.get('FILE_NAME', context.getHandler());
    return next.handle().pipe(map((data) => {
      if (this.isBrowserRequest(req)) {
        return this.render(data, file);
      }
      return data;
    }));
  }

  isBrowserRequest(req): boolean {
    const agent = req.headers['user-agent'];
    return ['Mozilla', 'Chrome', 'Chromium'].some(browser => agent.includes(browser));
  }

  render(data: Record<string, any>, file: string): string {
    const template = handlebars.compile(readFileSync(join(process.cwd(), 'views', file), 'utf8').toString());
    console.log(template)
    return template(data)
  }
}
