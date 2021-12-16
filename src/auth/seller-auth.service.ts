import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt' ;
import { User } from 'src/Users/user.entity';

const bcrypt = require('bcrypt') ;

@Injectable()
export class SellerAuthService {
    
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        private readonly jwtService: JwtService ,
    ) {}

    async validateLogin(mobile:string, pass:string):Promise<any> {

        let usr = await this.userRepo.findOne({mobile: mobile}, {
            relations: ['sellerAccount'],
        }) ;
        
        if(!usr || !usr.sellerAccount) return null ;  // added check

        // console.log('You have a seller account !! \n') ;

        const match = await bcrypt.compare(pass, usr.password);
        
        if( match) {
            const { password, ...result } = usr;
            return result;
        }
        return null ;
    }

    async login(user: any) {
        // console.log(user.sellerAccount.pancardId) ;
        const payload = { username: user.sellerAccount.pancardId, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
    }
      
}
