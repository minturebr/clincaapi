/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('pets_type',
      [
        {
          name: 'Cachorro',
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now())
        },
        {
          name: 'Cat',
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now())
        },
        {
          name: 'Hamster',
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now())
        }
      ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('pets_type')
  }
}
