import messages from 'src/constants/defaults/messages.default'
import config from 'src/config'
import accountingService from '../services/accounting.service'
import transactionTypes from 'src/constants/enums/transactionTypes.enum'

export default {
  async purchaseCoin(req, res, next) {
    try {
      const {
        user: { id: userId },
        query: {
          coinCount,
          Authority,
          Status,
        },
      } = req

      const price = config.values.coinPrices[coinCount]
      if (!price) {
        return res.build.notFound(messages.ITEM_NOT_FOUND)
      }

      if (Authority) {
        if (Status === 'NOK') {
          return res.redirect(`${config.appName}://menu?user=${JSON.stringify({
              // user: transformSelfProfile(savedUser),
              success: false,
            }
          )}`)
        }
        if (await accountingService.verifyPayment({ userId, amount: price, Authority })) {
          await accountingService.createTransaction({
            userId,
            value: coinCount,
            type: transactionTypes.RECHARGE,
            recordId: Authority
          })

          return res.redirect(`${config.appName}://menu?user=${JSON.stringify({
              balance: await accountingService.getBalance(userId),
              success: true,
            }
          )}`)
        } else {
          return next(new Error('Payment Error'))
        }
      }

      const url = (req.protocol + '://' + req.get('host') + req.originalUrl)
      const paymentLink = await accountingService.getPaymentLink({
        amount: price,
        callBackUrl: url,
        description: `${coinCount} عدد سکه`,
      })

      return res.redirect(paymentLink)
    } catch (error) {
      switch (error.message) {
        default:
          return next(error)
      }
    }
  },

  async validateCafeBazaarPurchase(req, res, next) {
    try {
      //
    } catch (error) {
      switch (error.message) {
        default:
          return next(error);
      }
    }
  }
}