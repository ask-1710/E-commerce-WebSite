import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ShopperJwtAuthGuard extends AuthGuard('shopper-jwt-strategy') {}