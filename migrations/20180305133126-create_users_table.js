'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
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
      phone_number: {
        type: Sequelize.STRING,
        unique: true
      },
      gender: {
        type: Sequelize.STRING,
      },
      avatars: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      settings: {
        allowNull: false,
        type: Sequelize.JSONB,
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
    });

  },

  down: function (queryInterface) {
    return queryInterface.dropTable('users');
  }
};

