import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocumenet = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true, sparse: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['admin', 'user'] })
  roles: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  telephone: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  address: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
