import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Room, RoomDocument } from 'src/shared/schemas/room.schema';

@Injectable()
export class RoomsService {

  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) { }

  public findAll(): Promise<Room[]> {
    return this.roomModel.find();
  }

  public findOne(id: string): Promise<Room> {
    return this.roomModel.findById(id);
  }

  public async create(room: Room): Promise<Room> {
    try {
      const newRoom = new this.roomModel(room);
      return await newRoom.save();
    } catch (e) {
      console.log(e);
    }
  }
}
