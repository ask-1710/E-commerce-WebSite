import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ShopperAuthService } from './shopper-auth.service';

@Injectable()
export class ShopperLocalStrategy extends PassportStrategy(Strategy,'shopper-strategy') {
  constructor(private authService: ShopperAuthService) {
    super({ usernameField: 'mobile' });
  }

  async validate(mobile: string, password: string): Promise<any> {
    const user = await this.authService.validateLogin(mobile, password);
    
    if (!user) {
      throw new UnauthorizedException('Log in as Shopper to access this endpoint at /login/shopper');
    }
    return user;
  }
}
