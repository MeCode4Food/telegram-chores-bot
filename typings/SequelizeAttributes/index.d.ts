// A helper type, SequelizeAttributes, will not let you forget about specifying or 
// leaving not implemented type in your attributes interface.
// Out of the box sequalize.define does not give you this guarantee.

import { DataTypeAbstract } from "sequelize/types";
import { ModelAttributeColumnOptions } from "sequelize";

type SequelizeAttribute = string | DataTypeAbstract | ModelAttributeColumnOptions

export type SequelizeAttributes<T extends { [key:string ]: any}> = {
  [P in keyof T]: SequelizeAttribute
}