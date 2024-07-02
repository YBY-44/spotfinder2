import { Injectable } from '@nestjs/common';
import { add } from '@spotfinder2/sample-lib';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!! ' + add(10, 20);
  }
  postHello(body: any): { message: string } {
    console.log('Received POST request with body:', body);
    return { message: 'Hello POST!' };
  }
}
