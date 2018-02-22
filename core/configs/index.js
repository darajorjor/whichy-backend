import dotenv from 'dotenv';

dotenv.config();

export default {
  APP: {
    PORT: process.env.APP_PORT,
    VERSION: process.env.APP_VERSION,
  },
};