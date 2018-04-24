import { Router } from 'express'
import accountingCtrl from '../controllers/accounting.controller'
import userMiddleware from 'src/middlewares/userSession.middleware'

const router = Router()

router.get('/purchase-coin',
  userMiddleware,
  //validation,
  accountingCtrl.purchaseCoin,
)

router.post('/validate-cafe-bazaar-purchase',
  userMiddleware,
  //validation,
  accountingCtrl.validateCafeBazaarPurchase,
)

module.exports = router
