import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  date: { type: String, required: true },
  user: { type: String, required: true },
  likes: { type: Number, required: false },
  comments: { type: String, required: false },
});

export interface Post extends mongoose.Document {
  id: string;
  title: string;
  body: string;
  date: string;
  user: string;
  likes: number;
  comments: string;
}
