import { Desk, DeskDocument } from 'src/shared/schemas/desk.schema';
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class DesksService {

    constructor(@InjectModel(Desk.name) private deskModel: Model<DeskDocument>) { }

    public findAll(): Promise<Desk[]> {
        return this.deskModel.find().catch((error) => error);
    }

    public findOne(id: string): Promise<Desk> {
        return this.deskModel.findById(id).catch((error) => error);
    }

    public async create(desk: Desk): Promise<Desk> {
        const newDesk = new this.deskModel(desk);
        return await newDesk.save().catch((error) => error);
    }
}
