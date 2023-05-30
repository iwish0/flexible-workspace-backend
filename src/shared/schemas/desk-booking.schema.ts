import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Desk } from './desk.schema';
import mongoose from 'mongoose';

export type DeskBookingDocument = DeskBooking & Document;

@Schema()
export class DeskBooking {

    @Prop({ required: true })
    public userName: string;

    @Prop({
        type: mongoose.Types.ObjectId,
        ref: Desk.name,
        required: true
    })
    public deskId: string;

    @Prop({
        required: true,
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

