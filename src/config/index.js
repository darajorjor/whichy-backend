import dotenv from 'dotenv'

dotenv.config()

export default {
  appName: 'whichy',
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
    videoAdPrize: 5,
    writeWhatifPrice: 90,
    coinPrices: {
      '100': 1000,
      '500': 4000,
      '1000': 6000,
      '10000': 20000,
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
  contact: {
    email: 'hey@whichy.com',
    mobile: '09120000000'
  },
}
