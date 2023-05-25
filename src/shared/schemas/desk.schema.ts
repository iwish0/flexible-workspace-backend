import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type DeskDocument = Desk & Document;

@Schema()
export class Desk {

    @Prop({ required: true })
    public name: string;

    @Prop({ required: true })
    public location: string;
}
export const DeskSchema = SchemaFactory.createForClass(Desk);

