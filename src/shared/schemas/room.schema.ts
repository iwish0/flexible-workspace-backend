import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type RoomDocument = Room & Document;

// TODO Mettre sous forme de constante les messages d'erreurs
@Schema()
export class Room {

  @Prop({
    required: true,
    maxlength: [20, `Ce champ est limité à 20 caractères`]
  })
  public name: string;

  @Prop({ required: true })
  public location: string;

  @Prop({ default: 'Pas de description de disponible' })
  public description: string;

  @Prop()
  public maxNumberPerson: number;
}

export const RoomSchema = SchemaFactory.createForClass(Room);

