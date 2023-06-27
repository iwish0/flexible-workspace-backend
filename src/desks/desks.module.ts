import { DesksServiceModule } from '../shared/services/desk/desks-service.module';
import { DesksController } from './desks.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [DesksController],
  imports: [DesksServiceModule]
})
export class DesksModule { }
