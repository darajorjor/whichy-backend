import messages from 'src/constants/defaults/messages.default'
import config from 'src/config'
import transactionTypes from 'src/constants/enums/transactionTypes.enum'
import { transformWhatifQuestion } from 'src/modules/games/transformers/games.transformer'
import questionsService from '../services/questions.service'
import gameService from 'src/modules/games/services/games.service'

export default {
  async list(req, res, next) {
    try {
      const {
        query: {
          lastId,
        },
      } = req

      const rows = await questionsService.list({
        lastId,
      })

      let cursor
      if (rows.length > 0) {
        cursor = rows[rows.length - 1].id
      }

      res.build.success({
        cursor,
        results: rows.map(i => transformWhatifQuestion(i)),
      })
    } catch (error) {
      switch (error.message) {
        default:
          return next(error)
      }
    }
  },

  async newQuestion(req, res, next) {
    try {
      const {
        body: {
          whatif,
          but,
        },
      } = req

      const createdQuestion = await gameService.newWhatifPanel({
        whatif,
        but,
      })

      return res.build.success({ question: transformWhatifQuestion(createdQuestion) })
    } catch (error) {
      switch (error.message) {
        default:
          return next(error)
      }
    }
  },

  async deleteQuestion(req, res, next) {
    try {
      const {
        params: {
          questionId,
        },
      } = req

      const deletedQuestion = await gameService.removeQuestion(questionId)

      return res.build.success({ question: transformWhatifQuestion(deletedQuestion) })
    } catch (error) {
      switch (error.message) {
        default:
          return next(error)
      }
    }
  },
}