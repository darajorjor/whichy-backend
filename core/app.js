import express from 'express';
import configs from 'core/configs'

global.Promise = require('bluebird');

const app = express();

app.use((req, res, err) => {
  console.log(req);
  res.status(200).send("Hello World");
});

app.listen(configs.APP.PORT, '0.0.0.0', () => {
  console.log(`App Listening On Port: ${configs.APP.PORT}`)
});
