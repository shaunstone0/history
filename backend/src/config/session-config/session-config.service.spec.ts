import { Test, TestingModule } from '@nestjs/testing';
import { SessionConfigService } from './session-config.service';

describe('SessionConfigService', () => {
  let service: SessionConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionConfigService],
    }).compile();

    service = module.get<SessionConfigService>(SessionConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
