import { Model, DataTypes } from 'sequelize'
import sequelize from './../../database/index'

class Pet extends Model {
    public id: number
    public name: string
    public age: number
    public type: number
    public owner: number
}

Pet.init(
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
    age: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    type: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    owner: {
      type: DataTypes.NUMBER,
      allowNull: false
    }
  },
  {
    tableName: 'pets',
    sequelize: sequelize
  }
)

export default Pet
