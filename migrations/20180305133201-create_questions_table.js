'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('questions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      title: {
        type: Sequelize.STRING,
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      order_index: Sequelize.INTEGER,
      category: Sequelize.STRING,
      status: Sequelize.STRING,
      is_custom: Sequelize.BOOLEAN,
      author: Sequelize.STRING,
      choices: Sequelize.JSONB,
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('questions')
  }
};
