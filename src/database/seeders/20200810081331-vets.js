/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('vets',
      [
        {
          name: 'Frodo Baggins',
          specialist: false,
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now())
        },
        {
          name: 'Jack Sparrow',
          specialist: false,
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now())
        },
        {
          name: 'Lucio Malfoy',
          specialist: false,
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now())
        },
        {
          name: 'Luna Lovegood',
          specialist: true,
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now())
        },
        {
          name: 'Ada Lovelace',
          specialist: true,
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now())
        }
      ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('vets')
  }
}
