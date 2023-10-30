import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  posts: { type: Array, required: false },
  likes: { type: Array, required: false },
  comments: { type: Array, required: false },
});

export interface User extends mongoose.Document {
  id: string;
  username: string;
  password: string;
  posts: [];
  likes: [];
  comments: [];
}
