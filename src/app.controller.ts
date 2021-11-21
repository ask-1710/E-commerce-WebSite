import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

// root route
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // GET decorator -> serves get request at this route
  @Get()
  @Header('Content-Type','text/html')
  getHello(): string {
    return this.appService.getHello();
  }
}

