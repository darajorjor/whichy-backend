import messages from 'src/constants/defaults/messages.default'
import config from 'src/config'
import authService from '../services/auth.service'
import transactionTypes from 'src/constants/enums/transactionTypes.enum'

export default {
  async login(req, res, next) {
    try {
      const {
        body: {
          username,
          password,
        },
      } = req

      const session = await authService.authenticateOperator({
        username,
        password,
      })

      return res.build.success({ token: session })
    } catch (error) {
      switch (error.message) {
        case messages.OPERATOR_NOT_FOUND:
          return res.build.notFound(messages.OPERATOR_NOT_FOUND)
        default:
          return next(error);
      }
    }
  }
}