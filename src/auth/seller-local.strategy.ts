import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SellerAuthService } from './seller-auth.service';

@Injectable()
export class SellerLocalStrategy extends PassportStrategy(Strategy,'seller-strategy') {
  constructor(private authService: SellerAuthService) {
    super({ usernameField: 'mobile' });
  }

  async validate(mobile: string, password: string): Promise<any> {
    const user = await this.authService.validateLogin(mobile, password);
    
    if (!user) {
      throw new UnauthorizedException('Log in as Seller to access this endpoint at /login/seller');
    }
    return user;
  }
}
