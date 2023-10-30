import * as mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
  body: { type: String, required: true },
  date: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: { type: Number, required: false },
});

export interface Comment extends mongoose.Document {
  id: string;
  body: string;
  date: string;
  user: string;
  likes: number;
}
