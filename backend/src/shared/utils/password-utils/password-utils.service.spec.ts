import { Test, TestingModule } from '@nestjs/testing';
import { PasswordUtilsService } from './password-utils.service';

describe('PasswordUtilsService', () => {
  let service: PasswordUtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordUtilsService],
    }).compile();

    service = module.get<PasswordUtilsService>(PasswordUtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
