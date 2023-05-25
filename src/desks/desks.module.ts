import { MongooseModule } from '@nestjs/mongoose';
import { DesksController } from './desks.controller';
import { DesksService } from './desks.service';
import { Module } from '@nestjs/common';
import { Desk, DeskSchema } from 'src/shared/schemas/desk.schema';

@Module({
  controllers: [DesksController],
  imports: [MongooseModule.forFeature([{ name: Desk.name, schema: DeskSchema }])],
  providers: [DesksService]
})
export class DesksModule { }
