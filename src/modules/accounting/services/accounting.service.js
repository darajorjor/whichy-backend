import { Transaction } from 'models'
import config from 'src/config'
import ZarinpalCheckout from 'zarinpal-checkout'

const zarinpal = ZarinpalCheckout.create(config.zarinpalApiKey, true)

export default {
  async getBalance(userId) {
    const sum = await Transaction.sum('amount',
      {
        where: {
          user_id: userId,
        },
      }
    )

    return sum
  },

  async createTransaction({ userId, type, value, recordId }) {
    return Transaction.create({
      type,
      user_id: userId,
      amount: value,
      record_id: recordId,
    })
  },

  async getPaymentLink({ amount, callBackUrl, description }) {
    const response = await zarinpal.PaymentRequest({
      Amount: amount,
      CallbackURL: callBackUrl,
      Description: description,
      Email: config.contact.email,
      Mobile: config.contact.mobile,
    })

    if (response.status === 100) {
      const {
        authority,
        url,
      } = response

      return url
    } else {
      throw new Error(response.status)
    }
  },

  async verifyPayment({ amount, Authority }) {
    const result = await zarinpal.PaymentVerification({
      Amount: amount,
      Authority,
    })

    return result.status !== -21
  },
}
