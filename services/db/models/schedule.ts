import { DataTypes, Model, ModelCtor, Optional, Sequelize } from 'sequelize/types'
import { SequelizeAttributes } from "../../../typings/SequelizeAttributes";
import { v4 as uuidv4 } from 'uuid';

export interface IScheduleAttributes {
  id: string
  userId: string
  jobDescription: string
  createdAt: Date
}

// id and doneAt are optional parameters during chore instance creation
interface IScheduleCreationAttributes extends Optional<IScheduleAttributes, 'id'> {}

interface IScheduleInstance extends Model<IScheduleAttributes, IScheduleCreationAttributes>, IScheduleAttributes {}

export const ScheduleFactory = (sequelize: Sequelize, dataTypes: typeof DataTypes): ModelCtor<IScheduleInstance> => {
  const attributes: SequelizeAttributes<IScheduleAttributes> = {
    id: {
      type: dataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4()
    },
    userId: {
      type: dataTypes.UUIDV4,
      key: 'id'
    },
    jobDescription: {
      type: dataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: dataTypes.DATE,
      allowNull: false
    }
  }

  const Schedule = sequelize.define<IScheduleInstance, IScheduleCreationAttributes>('Schedule', attributes)

  return Schedule
}