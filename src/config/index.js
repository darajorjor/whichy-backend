import dotenv from 'dotenv'

dotenv.config()

export default {
  appName: 'whichy',
  androidPackageName: 'com.whichy.whichy',
  port: process.env.APP_PORT,
  postgres: {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
  },
  onesignal: {
    apiKeys: [
      process.env.ONESIGNAL_API_KEY_JARAQE_DEFAULT,
    ],
    appIds: [
      process.env.ONESIGNAL_APP_ID_JARAQE_DEFAULT,
    ],
  },
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
  },
  values: {
    timeIntervals: {
      sessionEx: 60 * 60,
    },
    videoAdPrize: 10,
    prizeInterval: 10,
    prizeValue: 10,
    writeWhatifPrice: 0,
    coinPrices: {
      '200': 2000,
      '500': 4500,
      '1000': 8000,
      '10000': 30000,
    },
    // gameDefaultCoinPrize: 15,
    // gameDefaultTurnTime: 60 * 48, // two days
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  zarinpalApiKey: process.env.ZARINPAL_API_KEY,
  tapsellAddress: 'https://api.tapsell.ir/v2/suggestions/validate-suggestion',
  cafeBazaarValidationAddress: ({ productId, purchaseToken }) => `https://pardakht.cafebazaar.ir/devapi/v2/api/validate/${this.androidPackageName}/inapp/${productId}/purchases/${purchaseToken}/`,
  contact: {
    email: 'hey@whichy.com',
    mobile: '09120000000'
  },
}
