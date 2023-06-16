import { Room, RoomSchema } from 'src/shared/schemas/room.schema';
import { RoomsController } from './rooms.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsService } from './rooms.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [RoomsController],
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }])],
  providers: [RoomsService]
})
export class RoomsModule { }
