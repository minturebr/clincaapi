import { Model, DataTypes } from 'sequelize'
import sequelize from './../../database/index'

class Client extends Model {
    public id: number
    public name: string
    public cpf: string
}

Client.init(
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[0-9]+$/i
      }
    }
  },
  {
    tableName: 'clients',
    sequelize: sequelize
  }
)

export default Client
