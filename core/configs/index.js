import dotenv from 'dotenv';

dotenv.config();

export default {
  APP: {
    PORT: process.env.APP_PORT,
    VERSION: process.env.APP_VERSION,
  },
  MONGO_DB: {
    HOST: process.env.MONGO_DB_HOST,
    PORT: process.env.MONGO_DB_PORT,
    NAME: process.env.MONGO_DB_NAME,
    USERNAME: process.env.MONGO_DB_USERNAME,
    PASSWORD: process.env.MONGO_DB_USERNAME,
    get connectionString() {
      return this.USERNAME && this.PASSWORD ?
        `mongodb://${this.USERNAME}:${this.PASSWORD}@${this.HOST}:${this.PORT}/${this.NAME}`
        : `mongodb://${this.HOST}:${this.PORT}/${this.NAME}`;
    },
  },
};