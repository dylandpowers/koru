import { Schema, model } from 'mongoose';

const GratitudeSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default model('Gratitude', GratitudeSchema);