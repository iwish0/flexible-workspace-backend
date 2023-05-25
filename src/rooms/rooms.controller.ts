import { Controller, Get, Param, Post, Body, NotFoundException, HttpStatus } from '@nestjs/common';
import { Room } from 'src/shared/schemas/room.schema';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {

  constructor(private readonly roomsService: RoomsService) { }

  @Get()
  public findAll(): Promise<Room[]> {
    return this.roomsService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<Room> {
    try {
      const room: Room = await this.roomsService.findOne(id);
      if (!room) {
        throw new NotFoundException();
      }
      return room
    } catch (e: any) {
      return e;
    }
  }

  @Post()
  public create(@Body() room: Room): Promise<Room> {
    return this.roomsService.create(room);
  }
}
