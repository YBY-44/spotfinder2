import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!!';
  }
  postHello(body: any): { message: string } {
    console.log('Received POST request with body:', body);
    return { message: 'Hello POST!' };
  }
}
