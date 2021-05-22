import { DataTypes, Model, ModelCtor, Optional, Sequelize } from 'sequelize/types'
import { SequelizeAttributes } from "../../../typings/SequelizeAttributes";
import { v4 as uuidv4 } from 'uuid';

export interface IUserAttributes {
  telegramId: number // use the telegramId
  username: string
  createdAt: Date
}

// id and doneAt are optional parameters during chore instance creation
interface IUserCreationAttributes {}

interface IUserInstance extends Model<IUserAttributes, IUserCreationAttributes>, IUserAttributes {}

export const UserFactory = (sequelize: Sequelize, dataTypes: typeof DataTypes): ModelCtor<IUserInstance> => {
  const attributes: SequelizeAttributes<IUserAttributes> = {
    telegramId: {
      type: dataTypes.NUMBER,
      primaryKey: true,
      allowNull: false
    },
    username: {
      type: dataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: dataTypes.DATE,
      allowNull: false
    }
  }

  const User = sequelize.define<IUserInstance, IUserCreationAttributes>('User', attributes)
  return User
}