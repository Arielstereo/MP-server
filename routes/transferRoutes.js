import {Router} from 'express'
import { enterCash, transfers } from '../controllers/transferController.js'


const router = Router()

router.post('/transfer', transfers)
router.post('/cash', enterCash)

export default router