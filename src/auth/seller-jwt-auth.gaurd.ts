import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SellerJwtAuthGuard extends AuthGuard('seller-jwt-strategy') {}