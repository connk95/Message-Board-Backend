import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
// import { PostSchema } from 'src/posts/post.model';
// import { Posts } from 'src/posts/post.model';

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
  // // posts: [];

  // @Prop({ type: [PostSchema], default: [] })
  // posts: Posts[];

  @Prop()
  likes: [];

  @Prop()
  comments: [];

  _id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
