import {Router} from 'express'
import { createNotification, enterCash, getNotifications, transfers } from '../controllers/transferController.js'


const router = Router()

router.post('/transfer', transfers)
router.post('/cash', enterCash)
router.post('/notification', createNotification )
router.get('/getNotifications/:id', getNotifications)

export default router