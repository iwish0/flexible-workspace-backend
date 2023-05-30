import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type DeskDocument = Desk & Document;

@Schema()
export class Desk {

    public _id: mongoose.Types.ObjectId;

    @Prop({ required: true })
    public name: string;

    @Prop({ required: true })
    public location: string;
}
export const DeskSchema = SchemaFactory.createForClass(Desk);

