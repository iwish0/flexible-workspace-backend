import { Desk, DeskSchema } from 'src/shared/schemas/desk.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { DesksService } from './desks.service';
import { Module } from '@nestjs/common';

@Module({
    providers: [DesksService],
    exports: [DesksService],
    imports: [MongooseModule.forFeature([{ name: Desk.name, schema: DeskSchema }])]
})
export class DesksServiceModule { }
