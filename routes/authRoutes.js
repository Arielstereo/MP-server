import {Router} from 'express'
import { editAliasService, loginService, profileService, registerService} from '../controllers/authController.js'

const router = Router()

router.get('/profile/:id', profileService)
router.post('/login', loginService )
router.post('/register', registerService)
router.post('/editAlias', editAliasService)



export default router