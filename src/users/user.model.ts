import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' }] })
  posts: mongoose.Types.ObjectId[];

  @Prop()
  likes: [];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }] })
  comments?: mongoose.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
