import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Desk } from '../schemas/desk.schema';
import mongoose from 'mongoose';

export type BookingDocument = Booking & Document;

@Schema()
export class Booking {

    @Prop({ required: true })
    public ownerName: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: Desk.name,
        required: true
    })
    public deskId: Desk;

    @Prop({
        required: true,
        default: new Date()
    })
    public dateCreated: Date;

    @Prop({ required: true })
    public checkInDate: Date;

    @Prop({ required: true })
    public checkOutDate: Date;

    @Prop({ required: true })
    public checkInTime: string;

    @Prop({ required: true })
    public checkOutTime: string;

    @Prop()
    public comment: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);

