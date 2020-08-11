/* eslint-disable @typescript-eslint/no-unused-vars */

'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('schedules', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      vet: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'vets',
          key: 'id'
        }
      },
      client: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'clients',
          key: 'id'
        }
      },
      pet: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pets',
          key: 'id'
        }
      },
      scheduling_date: {
        type: Sequelize.DATE,
        allowNull: false
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
    return queryInterface.dropTable('schedules')
  }
}
