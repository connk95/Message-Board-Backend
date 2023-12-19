import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/user.model';

@Schema({ timestamps: true })
export class Comments extends Document {
  @Prop({ required: true })
  text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Posts', required: true })
  postId: string;

  @Prop()
  likes: User[];

  createdAt?: Date;

  updatedAt?: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comments);
