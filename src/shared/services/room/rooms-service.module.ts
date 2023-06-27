import { Room, RoomSchema } from 'src/shared/schemas/room.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsService } from './rooms.service';
import { Module } from '@nestjs/common';

@Module({
    providers: [RoomsService],
    exports: [RoomsService],
    imports: [MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }])]
})
export class RoomsServiceModule { }
