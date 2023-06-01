import { Module } from '@nestjs/common';
import { OfficeLayoutController } from './office-layout.controller';
import { OfficeLayoutService } from './office-layout.service';

@Module({
  controllers: [OfficeLayoutController],
  providers: [OfficeLayoutService]
})
export class OfficeLayoutModule {}
