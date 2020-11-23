import { Schema, model } from 'mongoose';

const UserSchema = Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  logs: {
    type: Array
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default model('User', UserSchema);