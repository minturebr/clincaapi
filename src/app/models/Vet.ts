import { Model, DataTypes } from 'sequelize'
import sequelize from './../../database/index'

class Vet extends Model {
    public id: number
    public name: string
    public specialist: boolean
}

Vet.init(
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
    specialist: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    tableName: 'vets',
    sequelize: sequelize
  }
)

export default Vet
