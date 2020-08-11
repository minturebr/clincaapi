import { Sequelize } from 'sequelize'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const databaseConfig = require('./../config/database')

class Database {
    sequelize = new Sequelize(databaseConfig)

    public constructor () {
      try {
        this.sequelize.authenticate()
        console.log('Connection has been established sucessfully.')
      } catch (error) {
        console.error('Unanble to connect to the database', error)
      }
    }
}

export default new Database().sequelize
