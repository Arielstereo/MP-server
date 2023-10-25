import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const stringConection = process.env.MONGODB_URI

export const connectToDatabase = async () => {
  try { await mongoose.connect(stringConection)
  console.log("Connected to MongoDB")}
  catch (err) { console.log(err)}
}