import { Transaction } from 'models'
import config from 'src/config'
import ZarinpalCheckout from 'zarinpal-checkout'
import requestify from 'requestify'

const zarinpal = ZarinpalCheckout.create(config.zarinpalApiKey, false)

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

  async validateCafeBazaarPurchase({ productId, purchaseToken }) {
    const response = await requestify.request(config.cafeBazaarValidationAddress({ productId, purchaseToken }), {
      method: 'POST',
      body: {
        suggestionId: adId,
      },
      headers: {
        'Content-Type': 'application/json'
      },
    })
  },
}
