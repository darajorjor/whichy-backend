import { Router } from 'express'
import gamesCtrl from '../controllers/games.controller'
import userMiddleware from 'src/middlewares/userSession.middleware'

const router = Router()

router.get('/whatif',
  userMiddleware,
  //validation,
  gamesCtrl.getWhatifQuestions
)
router.post('/whatif/:questionId',
  userMiddleware,
  //validation,
  gamesCtrl.answerWhatif
)
router.post('/whatif/:questionId/rate',
  userMiddleware,
  //validation,
  gamesCtrl.rateQuestion
)
router.post('/watch-ad',
  userMiddleware,
  //validation,
  gamesCtrl.watchAd,
)
router.post('/whatif',
  userMiddleware,
  //validation,
  gamesCtrl.writeWhatif,
)

module.exports = router
