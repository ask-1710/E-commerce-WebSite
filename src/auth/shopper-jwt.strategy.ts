import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class ShopperJwtStrategy extends PassportStrategy(Strategy, 'shopper-jwt-strategy') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, mobile: payload.username }; // username = mobile
  }
}

/*

curl http://localhost:5000/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjU2NTY1NjU2NTYiLCJzdWIiOjMsImlhdCI6MTYzODg2MDM3NCwiZXhwIjoxNjM4ODYwNDM0fQ.ZqR12a_JYdO09Nczro5AXibYycF-YpVy-6yGKiRGgN8"

*/