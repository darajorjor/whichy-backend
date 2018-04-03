import messages from 'src/constants/defaults/messages.default'
import gameService from '../services/games.service'
import { transformWhatifQuestion } from '../transformers/games.transformer'

export default {
  async getWhatifQuestions(req, res, next) {
    try {
      const { user: { id, stats: { whatif } } } = req

      const questions = await gameService.listQuestions({ userId: id, whatIfStats: whatif })

      return res.build.success({
        questions: questions.map(transformWhatifQuestion),
        level: whatif.level,
        questionsAnswered: whatif.questionsAnswered,
        levelQuestions: whatif.levelQuestions,
      })
    } catch (error) {
      switch (error.message) {
        default:
          return next(error)
      }
    }
  },
  async answerWhatif(req, res, next) {
    try {
      const { user: { id } } = req
      const { questionId } = req.params
      const { accept } = req.query

      const answeredQuestion = await gameService.answerQuestion({ questionId, userId: id, accept })

      return res.build.success(transformWhatifQuestion(answeredQuestion))
    } catch (error) {
      switch (error.message) {
        case messages.QUESTION_NOT_FOUND:
          return res.build.notFound(messages.QUESTION_NOT_FOUND)
        case messages.ANSWERED_BEFORE:
          return res.build.forbidden(messages.ANSWERED_BEFORE)
        default:
          return next(error)
      }
    }
  },
  async rateQuestion(req, res, next) {
    try {
      const { user: { id } } = req
      const { questionId } = req.params
      const { like } = req.body

      const ratedQuestion = await gameService.rateQuestion({ questionId, userId: id, like })
      debugger

      return res.build.success(transformWhatifQuestion(ratedQuestion))
    } catch (error) {
      switch (error.message) {
        default:
          return next(error);
      }
    }
  },
  async watchAd(req, res, next) {
    try {
      const {
        user: { id: userId },
        body: {
          adId,
        },
      } = req

      const newBalance = await gameService.watchAd({ userId, adId })

      return res.build.success({ balance: newBalance })
    } catch (error) {
      switch (error.message) {
        case messages.AD_NOT_VALID:
          return res.build.forbidden(messages.AD_NOT_VALID)
        default:
          return next(error);
      }
    }
  },

  async writeWhatif(req, res, next) {
    try {
      const {
        user: { id: userId },
        body: {
          whatif,
          but,
        },
      } = req

      const balance = await gameService.newWhatif({
        userId,
        whatif,
        but,
      })

      return res.build.success({ balance })
    } catch (error) {
      switch (error.message) {
        case messages.NOT_ENOUGH_BALANCE:
          return res.build.forbidden(messages.NOT_ENOUGH_BALANCE)
        default:
          return next(error);
      }
    }
  }
}
