import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule  } from "@nestjs/typeorm";
import { User } from '../Users/user.entity' ;
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt' ;
import { jwtConstants } from './constants';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([User]), 
    PassportModule, 
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
