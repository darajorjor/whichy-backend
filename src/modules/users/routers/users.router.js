import { Router } from 'express'
import userCtrl from '../controllers/user.controller'
import userMiddleware from 'src/middlewares/userSession.middleware'

const router = Router()

router.get('/self',
  userMiddleware,
  //validation,
  userCtrl.getSelfProfile
)

router.put('/self',
  userMiddleware,
  //validation,
  userCtrl.updateUser
)

router.get('/startup',
  userMiddleware,
  //validation,
  userCtrl.startup
)

module.exports = router
