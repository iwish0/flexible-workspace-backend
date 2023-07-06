import { Test, TestingModule } from '@nestjs/testing';
import { OutlookCalendarController } from './outlook-calendar.controller';

describe('OutlookCalendarController', () => {
  let controller: OutlookCalendarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OutlookCalendarController],
    }).compile();

    controller = module.get<OutlookCalendarController>(OutlookCalendarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
