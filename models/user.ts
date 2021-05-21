import { DataTypes, Model, ModelCtor, Optional, Sequelize } from 'sequelize/types'
import { SequelizeAttributes } from "../typings/SequelizeAttributes";
import { v4 as uuidv4 } from 'uuid';

export interface IUserAttributes {
  id: string
  username: string
  createdAt: Date
}

// id and doneAt are optional parameters during chore instance creation
interface IUserCreationAttributes extends Optional<IUserAttributes, 'id'> {}

interface IUserInstance extends Model<IUserAttributes, IUserCreationAttributes>, IUserAttributes {}

export const UserFactory = (sequelize: Sequelize, dataTypes: typeof DataTypes): ModelCtor<IUserInstance> => {
  const attributes: SequelizeAttributes<IUserAttributes> = {
    id: {
      type: dataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4()
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