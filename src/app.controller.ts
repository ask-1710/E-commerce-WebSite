import { Controller, Get, Header, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.gaurd' ;
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.gaurd';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}
  
  @Get()
  @Header('Content-Type','text/html')
  getHello(): string {
    return this.appService.getHello();
  }
  
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}

