import { Controller, Get, Header, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from '@nestjs/common';
import { ShopperLocalAuthGuard } from './auth/shopper-local-auth.gaurd' ;
import { ShopperAuthService } from './auth/shopper-auth.service';
import { ShopperJwtAuthGuard }  from './auth/shopper-jwt-auth.gaurd' ;
import { SellerLocalAuthGuard } from './auth/seller-local-auth.gaurd' ;
import { SellerAuthService } from './auth/seller-auth.service';
import { SellerJwtAuthGuard } from './auth/seller-jwt-auth.gaurd';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: ShopperAuthService,
    private readonly sellerAuthService: SellerAuthService,
  ) {}
  
  @Get()
  @Header('Content-Type','text/html')
  getHello(): string {
    return this.appService.getHello();
  }
  
  @UseGuards(ShopperLocalAuthGuard)
  @Post('auth/login')
  async shopperLogin(@Request() req) {
    return this.authService.login(req.user);
  }
  
  @UseGuards(ShopperJwtAuthGuard)  // view my profile
  @Get('my-shopper-profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(SellerJwtAuthGuard) 
  @Get('my-seller-profile')
  getSellerProfile(@Request() req) {
    return req.user ;
  }

  @UseGuards(SellerLocalAuthGuard) 
  @Post('auth/seller/login/')
  async sellerLogin(@Request() req) {
    return this.sellerAuthService.login(req.user) ;
  }

}

