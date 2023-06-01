import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Desk } from './desk.schema';
import mongoose from 'mongoose';
import { User } from '../models/user.model';

export type DeskBookingDocument = DeskBooking & Document;

@Schema()
export class DeskBooking {

    @Prop({ required: true, type: User })
    public user: User;

    @Prop({
        type: mongoose.Types.ObjectId,
        ref: Desk.name,
        required: true
    })
    public deskId: string;

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

export const DeskBookingSchema = SchemaFactory.createForClass(DeskBooking);

