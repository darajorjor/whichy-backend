import { Sequelize, sequelize } from 'connections/postgres'
import transactionTypes from 'src/constants/enums/transactionTypes.enum'

const Transaction = sequelize.define('transaction',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    type: {
      allowNull: false,
      type: Sequelize.ENUM(Object.values(transactionTypes)),
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    user_id: {
      allowNull: false,
      type: Sequelize.UUID,
    },
    record_id: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    }
  },
  {
    tableName: 'transactions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
)

export default Transaction
