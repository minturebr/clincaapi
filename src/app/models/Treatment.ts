import { Model, DataTypes } from 'sequelize'
import sequelize from './../../database/index'
import Schedule from './Schedule'

class Treatment extends Model {
    public id: number
    public diagnosis: string
    public schedule: number
}

Treatment.init(
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    diagnosis: {
      type: DataTypes.STRING,
      allowNull: false
    },
    schedule: {
      type: DataTypes.NUMBER,
      allowNull: false
    }
  },
  {
    tableName: 'treatments',
    sequelize: sequelize
  }
)

Treatment.hasOne(Schedule, {
  sourceKey: 'schedule',
  foreignKey: 'id',
  as: 'scheduleData'
})

export default Treatment
