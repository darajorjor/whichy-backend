import { Sequelize, sequelize } from 'connections/postgres'
import userAdditionalData from 'src/constants/defaults/userAdditionalData.default'
import status from 'src/constants/enums/status.enum'

const Operator = sequelize.define('operator',
  {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    password: Sequelize.STRING,
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    session: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      defaultValue: Sequelize.UUIDV4,
    },
    status: {
      type: Sequelize.ENUM(Object.values(status.OPERATOR)),
      defaultValue: status.OPERATOR.PENDING,
    },
    additional_data: {
      type: Sequelize.JSONB,
      defaultValue: userAdditionalData,
    },
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
)

export default Operator
