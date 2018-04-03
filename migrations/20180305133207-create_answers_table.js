'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('answers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
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
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    })
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('answers')
  }
}
