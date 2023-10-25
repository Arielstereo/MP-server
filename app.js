import express from 'express'
import authRoutes from './routes/authRoutes.js'
import transferRoutes from './routes/transferRoutes.js'
import cors from 'cors'

const app = express()

app.use(express.json()); 
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  credentials:true,
  allowedHeaders: ["Authorization", "Content-Type"]
}))
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)
app.use('/api/operations', transferRoutes)

export default app