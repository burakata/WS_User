import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  birth_date: Date,
  record_date: Date,
  update_date: Date,
}); 