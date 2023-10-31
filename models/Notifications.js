import { Schema, model } from 'mongoose';

const notificationSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: String
  }
},
{
  versionKey: false
});

export const Notification = model('Notification', notificationSchema);
