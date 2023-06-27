import { Desk, DeskDocument } from 'src/shared/schemas/desk.schema';
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class DesksService {

    constructor(@InjectModel(Desk.name) private deskModel: Model<DeskDocument>) { }

    public findAll(): Promise<Desk[]> {
        return this.deskModel.find();
    }

    public findOne(id: string): Promise<Desk> {
        return this.deskModel.findById(id);
    }

    public create(desk: Desk): Promise<Desk> {
        return new this.deskModel(desk).save();
    }
}
