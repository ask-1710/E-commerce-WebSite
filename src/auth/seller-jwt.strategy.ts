import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SellerJwtStrategy extends PassportStrategy(Strategy, 'seller-jwt-strategy') {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    const id = payload.sub ;
    const usr = await this.usersRepo.findOne(id, {
      relations: ['sellerAccount'],
    }) ;
    if(usr.sellerAccount) 
        return { id: payload.sub, pancardId: payload.username }; 
  }

}

/*

curl http://localhost:5000/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjU2NTY1NjU2NTYiLCJzdWIiOjMsImlhdCI6MTYzODg2MDM3NCwiZXhwIjoxNjM4ODYwNDM0fQ.ZqR12a_JYdO09Nczro5AXibYycF-YpVy-6yGKiRGgN8"

*/