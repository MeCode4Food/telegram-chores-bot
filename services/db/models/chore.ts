import { BuildOptions, DataTypes, Model, ModelCtor, Optional, Sequelize } from 'sequelize/types'
import { SequelizeAttributes } from "../../../typings/SequelizeAttributes";
import { v4 as uuidv4 } from 'uuid';

export interface IChoreAttributes {
  id: string
  userId: string
  scheduleId: string
  description: string
  done: boolean
  createdAt: Date
  doneAt: Date
}

// id and doneAt are optional parameters during chore instance creation
interface IChoreCreationAttributes extends Optional<IChoreAttributes, 'id' | 'doneAt'> {}

interface IChoreInstance extends Model<IChoreAttributes, IChoreCreationAttributes>, IChoreAttributes {}

export const ChoreFactory = (sequelize: Sequelize, dataTypes: typeof DataTypes): ModelCtor<IChoreInstance> => {
  const attributes: SequelizeAttributes<IChoreAttributes> = {
    id: {
      type: dataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4()
    },
    scheduleId: {
      type: dataTypes.UUIDV4,
      key: 'id',
    },
    userId: {
      type: dataTypes.UUIDV4,
      key: 'id',
      allowNull: false
    },
    description: {
      type: dataTypes.STRING,
      allowNull: false
    },
    done: {
      type: dataTypes.BOOLEAN,
      allowNull: false
    },
    createdAt: {
      type: dataTypes.DATE,
      allowNull: false
    },
    doneAt: {
      type: dataTypes.DATE
    }
  }

  const Chore = sequelize.define<IChoreInstance, IChoreCreationAttributes>('Chore', attributes)

  return Chore
}