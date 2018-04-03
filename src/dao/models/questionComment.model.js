import { Sequelize, sequelize } from 'connections/postgres'

const QuestionComment = sequelize.define('questionComment',
  {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    text: Sequelize.STRING,
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
    tableName: 'question_comments',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
)

export default QuestionComment
