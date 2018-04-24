import { Operator } from 'models'
import config from 'src/config'
import ZarinpalCheckout from 'zarinpal-checkout'
import statuses from 'src/constants/enums/status.enum'
import messages from 'src/constants/defaults/messages.default'

export default {
  async authenticateOperator({ username, password }) {
    const operator = await Operator.findOne({
      where: {
        username,
        password,
        status: statuses.OPERATOR.ACTIVE,
      }
    })

    if (!operator) throw new Error(messages.OPERATOR_NOT_FOUND)

    return operator.session
  },
}
