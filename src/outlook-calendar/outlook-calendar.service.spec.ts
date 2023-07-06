import { Test, TestingModule } from '@nestjs/testing';
import { OutlookCalendarService } from './outlook-calendar.service';

describe('OutlookCalendarService', () => {
  let service: OutlookCalendarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OutlookCalendarService],
    }).compile();

    service = module.get<OutlookCalendarService>(OutlookCalendarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
