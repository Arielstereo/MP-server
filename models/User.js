import {Schema, model} from 'mongoose'

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    default: 0
  },
  alias: {
    type: String,
    unique: true,
    required: true
  }

},
{
  versionKey: false
}
)

export const User = model('User', userSchema)