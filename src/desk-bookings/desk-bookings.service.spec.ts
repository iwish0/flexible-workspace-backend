import { DeskBookingsService } from './desk-bookings.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('DeskBookingsService', () => {
  let service: DeskBookingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({ providers: [DeskBookingsService] }).compile();
    service = module.get<DeskBookingsService>(DeskBookingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
