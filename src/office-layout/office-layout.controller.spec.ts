import { Test, TestingModule } from '@nestjs/testing';
import { OfficeLayoutController } from './office-layout.controller';

describe('OfficeLayoutController', () => {
  let controller: OfficeLayoutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfficeLayoutController],
    }).compile();

    controller = module.get<OfficeLayoutController>(OfficeLayoutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
