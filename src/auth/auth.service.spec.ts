import { Test, TestingModule } from '@nestjs/testing';
import { ShopperAuthService } from './shopper-auth.service';
import { SellerAuthService } from './seller-auth.service';
describe('AuthService', () => {
  let service:ShopperAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopperAuthService],
    }).compile();

    service = module.get<ShopperAuthService>(ShopperAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});


describe('SellerAuthService', () => {
  let service: SellerAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SellerAuthService],
    }).compile();

    service = module.get<SellerAuthService>(SellerAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

