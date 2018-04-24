import { Question } from 'models'
import config from 'src/config'
import ZarinpalCheckout from 'zarinpal-checkout'
import statuses from 'src/constants/enums/status.enum'
import messages from 'src/constants/defaults/messages.default'

export default {
  async list({ lastId }) {
    const lastRow = lastId ? await Question.findById(lastId) : undefined
    const where = {
      status: statuses.QUESTION.ACTIVE,
    }
    if (lastRow) {
      where.created_at = { $lt: lastRow.created_at }
    }
    return Question.findAll({
      where,
      limit: 25,
      order: [['created_at', 'DESC']],
    })
  },
}
