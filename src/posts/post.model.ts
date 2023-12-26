import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/user.model';
import { Comments } from 'src/comments/comment.model';

@Schema({ timestamps: true })
export class Posts extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop()
  likes?: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }] })
  comments?: Comments[];

  createdAt?: Date;

  updatedAt?: Date;
}

export const PostSchema = SchemaFactory.createForClass(Posts);
