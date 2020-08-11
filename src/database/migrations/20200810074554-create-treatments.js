/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('treatments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      diagnosis: {
        type: Sequelize.STRING,
        allowNull: false
      },
      schedule: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'schedules',
          key: 'id'
        }
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('treatments')
  }
}
