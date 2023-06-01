import { Test, TestingModule } from '@nestjs/testing';
import { OfficeLayoutService } from './office-layout.service';

describe('OfficeLayoutService', () => {
  let service: OfficeLayoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OfficeLayoutService],
    }).compile();

    service = module.get<OfficeLayoutService>(OfficeLayoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
