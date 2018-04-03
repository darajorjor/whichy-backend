import { Sequelize, sequelize } from 'connections/postgres'
import questionTypes from 'src/constants/enums/questionTypes.enum'

const Question = sequelize.define('question',
  {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    title: Sequelize.STRING,
    type: Sequelize.ENUM(Object.values(questionTypes)),
    order_index: Sequelize.INTEGER,
    category: Sequelize.STRING,
    author: Sequelize.STRING,
    is_custom: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    choices: {
      type: Sequelize.JSONB,
      defaultValue: [],
    }
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
)

export default Question
