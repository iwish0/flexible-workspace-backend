import { Test, TestingModule } from '@nestjs/testing';
import { DeskBookingsController } from './desk-bookings.controller';

describe('DeskBookingsController', () => {
  let controller: DeskBookingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeskBookingsController],
    }).compile();

    controller = module.get<DeskBookingsController>(DeskBookingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
