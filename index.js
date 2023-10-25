import app from './app.js'
import dotenv from 'dotenv'
import {connectToDatabase} from './db/config.js'

dotenv.config()

const port = process.env.PORT || 3100

connectToDatabase()

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})