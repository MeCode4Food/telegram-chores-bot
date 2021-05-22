// Honestly not even sure if this is a good folder structure for exporting models
// Should the models be exported from ./models? 
// How would the API consumer know if userModel/choreModel singletons has been instantiated
import { DataTypes, Sequelize } from "sequelize";
import { ChoreFactory } from "./models/chore";
import { UserFactory } from "./models/user";

export const sequelize = new Sequelize('sqlite::memory')
export const choreModel = ChoreFactory(sequelize, DataTypes)
export const userModel = UserFactory(sequelize, DataTypes)

export const syncTables = async () => {
  console.log('syncing tables...')
  await Promise.all([userModel.sync(), choreModel.sync()])
  console.log('tables synced')
}