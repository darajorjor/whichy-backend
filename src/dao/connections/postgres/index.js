import Sequelize from 'sequelize'
import appConfig from 'src/config'
import Log from 'src/utils/logger'

const sequelize = new Sequelize(
  appConfig.postgres.database,
  appConfig.postgres.username,
  appConfig.postgres.password,
  {
    host: appConfig.postgres.host,
    port: appConfig.postgres.port,
    dialect: 'postgres',
    logging: true,
    pool: {
      min: 1,
      max: 10,
    },
  },
)

sequelize.authenticate().then(() => {
  Log.info('Postgres Connection has been established successfully')
}).catch((error) => {
  Log.error('Unable to connect to the postgres database', { error })
  throw new Error('postgres_connection_error')
})

export {
  Sequelize,
  sequelize,
}
