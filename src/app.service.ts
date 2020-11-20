import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): Record<string, any>{
    return { message: 'Hello World!' };
  }
}
