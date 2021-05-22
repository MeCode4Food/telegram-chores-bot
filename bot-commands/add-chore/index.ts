import addChoreScene from "../../bot-scenes/add-chore";
import { IBotCommand, MessageContext } from '../../typings/BotCommand'

const AddChoreCommand: IBotCommand = class {
  static commandName = 'addChore'
  static callback = (ctx) => {
    ctx.scene.enter('ADD_CHORE')
  }
}

export default AddChoreCommand
