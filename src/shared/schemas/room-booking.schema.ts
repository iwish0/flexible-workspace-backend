import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../models/user.model';
import { Room } from './room.schema';
import mongoose from 'mongoose';

export type RoomBookingDocument = RoomBooking & Document;

@Schema()
export class RoomBooking {

    @Prop({ required: true, type: User })
    public user: User;

    @Prop({
        type: mongoose.Types.ObjectId,
        ref: Room.name,
        required: true
    })
    public roomId: string;

    @Prop({
        required: false,
        default: new Date()
    })
    public dateCreated: Date;

    @Prop({ required: true })
    public checkInDateTime: Date;

    @Prop({ required: true })
    public checkOutDateTime: Date;

    @Prop()
    public comment: string;
}

export const RoomBookingSchema = SchemaFactory.createForClass(RoomBooking);

