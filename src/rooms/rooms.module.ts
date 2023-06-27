import { RoomsServiceModule } from '../shared/services/room/rooms-service.module';
import { RoomsController } from './rooms.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [RoomsController],
  imports: [RoomsServiceModule]
})
export class RoomsModule { }
