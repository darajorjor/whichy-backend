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
