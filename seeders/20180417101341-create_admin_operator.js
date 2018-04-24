'use strict';
const uuid = require('uuid/v4')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('operators', [  {
      id: uuid(),
      first_name: 'admin',
      last_name: 'admin',
      password: 'stevenhawkings',
      username: 'admin',
      email: 'whichycom@gmail.com',
      session: uuid(),
      status: 'ACTIVE',
      additional_data: '{}',
      created_at: new Date(),
      updated_at: new Date(),
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('operators', null, {})
  }
};
