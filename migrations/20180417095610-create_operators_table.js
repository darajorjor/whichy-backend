'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('operators', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      first_name: {
        type: Sequelize.STRING,
      },
      last_name: {
        type: Sequelize.STRING,
      },
      password: Sequelize.STRING,
      username: {
        type: Sequelize.STRING,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      session: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      status: {
        type: Sequelize.STRING,
      },
      additional_data: {
        allowNull: false,
        type: Sequelize.JSONB,
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

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('operators')
  }
}
