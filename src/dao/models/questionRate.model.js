import { Sequelize, sequelize } from 'connections/postgres'

const QuestionComment = sequelize.define('questionRate',
  {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    like: Sequelize.BOOLEAN,
    user_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    question_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
  },
  {
    tableName: 'question_rates',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
)

export default QuestionComment
