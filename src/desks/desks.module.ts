import { Desk, DeskSchema } from 'src/shared/schemas/desk.schema';
import { DesksController } from './desks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DesksService } from './desks.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [DesksController],
  imports: [MongooseModule.forFeature([{ name: Desk.name, schema: DeskSchema }])],
  providers: [DesksService]
})
export class DesksModule { }
