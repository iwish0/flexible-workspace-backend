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
  public findOne(@Param('id') id: string): Promise<Room> {
    return this.roomsService.findOne(id);
  }

  @Post()
  public create(@Body() room: Room): Promise<Room> {
    return this.roomsService.create(room);
  }
}
