import { Module } from '@nestjs/common';
import { ShopperAuthService } from './shopper-auth.service';
import { TypeOrmModule  } from "@nestjs/typeorm";
import { User } from '../Users/user.entity' ;
import { PassportModule } from '@nestjs/passport';
import { ShopperLocalStrategy } from './shopper-local.strategy';
import { SellerLocalStrategy} from './seller-local.strategy' ;
import { JwtModule } from '@nestjs/jwt' ;
import { jwtConstants } from './constants';
import { SellerJwtStrategy } from './seller-jwt.strategy' ;
import { ShopperJwtStrategy } from './shopper-jwt.strategy' ;
import { SellerAuthService } from './seller-auth.service';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([User]), 
    PassportModule, 
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '72h' },
    }),
  ],
  providers: [ShopperAuthService, SellerLocalStrategy ,  SellerAuthService , ShopperLocalStrategy , ShopperJwtStrategy, SellerJwtStrategy ],
  exports: [ShopperAuthService, SellerAuthService],
})
export class AuthModule {}
