import { Test, TestingModule } from '@nestjs/testing';
import { WinstonConfigService } from './winston-config.service';

describe('WinstonConfigService', () => {
  let service: WinstonConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WinstonConfigService],
    }).compile();

    service = module.get<WinstonConfigService>(WinstonConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
