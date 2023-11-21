import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  posts: [];

  @Prop()
  likes: [];

  @Prop()
  comments: [];
}

export const UserSchema = SchemaFactory.createForClass(User);
