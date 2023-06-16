import { Room, RoomDocument } from 'src/shared/schemas/room.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from 'mongoose';

@Injectable()
export class RoomsService {

  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) { }

  public findAll(): Promise<Room[]> {
    return this.roomModel.find();
  }

  public async findOne(id: string): Promise<Room> {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(id)
    const room: Room = await this.roomModel.findById(_id);
    if (!room) throw new NotFoundException();
    return room;
  }

  public create(room: Room): Promise<Room> {
    return new this.roomModel(room).save();
  }
}
