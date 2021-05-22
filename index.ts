import dotenv from 'dotenv'
import { validateProcessEnvironmentFields } from './environment'
import { Context, session, Telegraf } from 'telegraf'
import { AllSceneContexts, sceneStages } from "./bot-scenes";
import { choreModel, syncTables, userModel } from './services/db'
import AddChoreCommand from './bot-commands/add-chore'
import StartCommand from './bot-commands/start'
import { SceneContext } from 'telegraf/typings/scenes';
import { Message, Update } from 'typegram';
import { MessageContext } from './typings/BotCommand';
dotenv.config()
require('source-map-support').install()

// check if env has the right fields. check environment.ts to edit environment fields
validateProcessEnvironmentFields()
const bot = new Telegraf<SceneContext<AllSceneContexts> & Context & AllSceneContexts>(process.env.TELEGRAM_BOT_KEY)

type ConversationState = {
  lastUpdated: Date
  lastState: string
}


// save conversation states
(async () => {
  // set up tables if they don't exist
  await syncTables()

  // still using even if deprecated
  bot.use(session())
  bot.use(sceneStages.middleware())

  // set up commands in bot-commands  
  bot.start(StartCommand.callback)
  bot.command(AddChoreCommand.commandName, AddChoreCommand.callback)

  bot.launch()
})()
// for debugging
;(global as any).bot = bot
;(global as any).choreModel = choreModel
;(global as any).userModel = userModel
console.log('hello')
