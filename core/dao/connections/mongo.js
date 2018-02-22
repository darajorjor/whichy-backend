import mongoose from 'mongoose';
import configs from 'core/configs';

mongoose.connect(configs.MONGO_DB.connectionString);

mongoose.Promise = global.Promise;

mongoose.connection.on('error', (error) => {
  console.error(error);
  throw new Error(`Unable To Connect To Database: ${configs.MONGO_DB.connectionString}`);
});

export default mongoose;