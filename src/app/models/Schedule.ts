import { Model, DataTypes } from 'sequelize'
import sequelize from './../../database/index'
import Vet from './Vet'
import Client from './Client'
import Pet from './Pet'

class Schedule extends Model {
    public id: number
    public name: string
    public vet: number
    public client: number
    public schedulingDate: Date
}

Schedule.init(
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    vet: {
      type: DataTypes.NUMBER,
      allowNull: false

    },
    client: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    pet: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    schedulingDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    tableName: 'schedules',
    sequelize: sequelize
  }
)

Schedule.hasOne(Vet, {
  sourceKey: 'vet',
  foreignKey: 'id',
  as: 'vetData'
})

Schedule.hasOne(Client, {
  sourceKey: 'client',
  foreignKey: 'id',
  as: 'clientData'
})

Schedule.hasOne(Pet, {
  sourceKey: 'pet',
  foreignKey: 'id',
  as: 'petData'
})

export default Schedule
