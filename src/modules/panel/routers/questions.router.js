import { Router } from 'express'
import questionsCtrl from '../controllers/questions.controller'
import validate from 'express-validation'
import operatorMiddleware from 'src/middlewares/operator.middleware'
import questionsValidation from '../validators/questions.validator'

const router = Router()

router.post('/questions',
  operatorMiddleware,
  validate(questionsValidation.newQuestion),
  questionsCtrl.newQuestion,
)
router.delete('/questions/:questionId',
  operatorMiddleware,
  questionsCtrl.deleteQuestion,
)
router.get('/questions',
  operatorMiddleware,
  questionsCtrl.list,
)

module.exports = router
