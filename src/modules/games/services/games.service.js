import config from 'src/config'
import { Question, Answer, QuestionRate } from 'models'
import whatifLevels from 'src/constants/enums/whatifLevels.enum'
import questionTypes from 'src/constants/enums/questionTypes.enum'
import messages from 'src/constants/defaults/messages.default'
import requestify from 'requestify'
import transactionTypes from 'src/constants/enums/transactionTypes.enum'
import accountingService from 'src/modules/accounting/services/accounting.service'
import uuid from 'uuid/v4'

export default {
  async getUserWhatifStats(userId) {
    const answersCount = await Answer.count({ where: { user_id: userId } })

    const level = whatifLevels.findIndex(lvl => lvl > answersCount) + 1

    return {
      level,
      questionsAnswered: answersCount,
      levelQuestions: whatifLevels[level - 1],
    }
  },

  async listQuestions({ userId, whatIfStats }) {
    // TODO what the fuck
    // simplest way possible for now

    const answers = await Answer.findAll({
      where: {
        user_id: userId,
      }
    })

    const questions = await Question.findAll({
      where: { type: questionTypes.WHAT_IF },
      include: [{
        model: Answer,
        as: 'answers',
      }],
    })

    const filteredQuestions = questions.filter(i => !i.answers.find(i => answers.map(i => i.dataValues.id).includes(i.dataValues.id)))

    debugger
    return Promise.all(filteredQuestions.splice(0, whatIfStats.levelQuestions - whatIfStats.questionsAnswered).map(async (question) => {
      question = question.toJSON()
      let yes = 0
      let no = 0
      question.answers.forEach(answer => {
        switch (answer.choice) {
          case question.choices[0].id:
            yes++
            break
          case question.choices[1].id:
            no++
            break
        }
      })

      return {
        ...question,
        stats: {
          yes: (100 * yes) / (yes + no),
          no: (100 * no) / (yes + no),
        },
      }
    }))
  },

  async answerQuestion({ questionId, userId, accept }) {
    const question = await Question.findById(questionId)

    if (!question) throw new Error(messages.QUESTION_NOT_FOUND)

    const answeredBefore = await Answer.find({ where: { question_id: questionId, user_id: userId } })
    if (answeredBefore) throw new Error(messages.ANSWERED_BEFORE)

    await Answer.create({
      choice: question.choices[accept ? 0 : 1].id,
      user_id: userId,
      question_id: questionId,
    })

    return question
  },

  async rateQuestion({ questionId, userId, like }) {
    const question = await Question.findById(questionId)

    if (!question) throw new Error(messages.QUESTION_NOT_FOUND)

    await QuestionRate
      .findOne({ where: { question_id: questionId, user_id: userId } })
      .then((obj) => {
        // update
        if (obj) {
          return obj.update({ like })
        }

        // insert
        return question.createRate({
          like,
          user_id: userId,
        })
      })

    return question
  },

  async watchAd({ userId, adId }) {
    const response = await requestify.request(config.tapsellAddress, {
      method: 'POST',
      body: {
        suggestionId: adId,
      },
      headers: {
        'Content-Type': 'application/json'
      },
    })

    const { valid } = JSON.parse(response.body)

    console.log(response)

    if (!valid) {
      // throw new Error(messages.AD_NOT_VALID)
    }

    await accountingService.createTransaction({
      type: transactionTypes.VIDEO,
      userId,
      value: config.values.videoAdPrize,
      recordId: adId,
    })

    return accountingService.getBalance(userId)
  },

  async newWhatif({ userId, whatif, but }) {
    // check user balance
    const balance = await accountingService.getBalance(userId)

    if (balance < config.values.writeWhatifPrice) {
      throw new Error(messages.NOT_ENOUGH_BALANCE)
    }

    const createQuestion = await Question.create({
      type: questionTypes.WHAT_IF,
      is_custom: true,
      author: userId,
      choices: JSON.stringify([
        {
          id: uuid(),
          text: whatif,
        },
        {
          id: uuid(),
          text: but,
        },
      ]),
    })

    await accountingService.createTransaction({
      userId,
      value: -config.values.writeWhatifPrice,
      recordId: createQuestion.id,
      type: transactionTypes.WRITE_WHATIF
    })

    return balance - config.values.writeWhatifPrice
  },
}