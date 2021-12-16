import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../Users/user.entity' ;
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt' ;

const bcrypt = require('bcrypt') ;

@Injectable()
export class ShopperAuthService {
    
    constructor(
        @InjectRepository(User)
        private readonly usersRepo: Repository<User>,
        private readonly jwtService: JwtService ,
    ) {}

    async validateLogin(mobile:string, pass:string):Promise<any> {
        let usr = await this.usersRepo.findOne({mobile: mobile})  ;
        
        if(!usr) return null ;

        const match = await bcrypt.compare(pass, usr.password);
        
        if( match) {
            const { password, ...result } = usr;
            return result;
        }
        return null ;
    }

    async login(user: any) {
        const payload = { username: user.mobile, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
    }
      
}
