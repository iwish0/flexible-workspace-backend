import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type RoomDocument = Room & Document;

@Schema()
export class Room {

  public _id: mongoose.Types.ObjectId;

  @Prop({
    required: true,
    maxlength: [20, `Ce champ est limité à 20 caractères`]
  })
  public name: string;

  @Prop()
  public location: string;

  @Prop({ default: 'Pas de description de disponible' })
  public description: string;

  @Prop()
  public maxNumberPerson: number;
}

export const RoomSchema = SchemaFactory.createForClass(Room);

