import { Router } from 'express'
import authCtrl from '../controllers/auth.controller'

const router = Router()

router.post('/login',
  // userMiddleware,
  //validation,
  authCtrl.login,
)

module.exports = router
