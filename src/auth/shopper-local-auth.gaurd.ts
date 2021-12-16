import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ShopperLocalAuthGuard extends AuthGuard('shopper-strategy') {}
