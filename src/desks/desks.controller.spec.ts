import { Test, TestingModule } from '@nestjs/testing';
import { DesksController } from './desks.controller';

describe('DesksController', () => {
  let controller: DesksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DesksController],
    }).compile();

    controller = module.get<DesksController>(DesksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
