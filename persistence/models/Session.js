import { Schema, model } from 'mongoose';

const SessionSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  lengthInMinutes: {
    type: Number,
    required: true
  },
  reflection: {
    type: String,
    required: true
  },
  isGuided: {
    type: Boolean,
    default: false
  },
  gratitudes: {
    type: Array
  },
  skillsUsed: {
    type: Array
  },
  mindfulAction: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
});

export default model('Session', SessionSchema);