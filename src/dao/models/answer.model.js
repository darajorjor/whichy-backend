import { Sequelize, sequelize } from 'connections/postgres'

const Answer = sequelize.define('answer',
  {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    text: Sequelize.STRING,
    choice: Sequelize.UUID,
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
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
)

export default Answer
