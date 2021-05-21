import dotenv from 'dotenv'
import { validateProcessEnvironmentFields } from './environment'
import { Context, Markup, Telegraf } from 'telegraf'
import { sequelize } from './services/sequelize'
import { ChoreFactory } from './models/chore'
import { UserFactory } from './models/user'
import { DataTypes } from 'sequelize'
dotenv.config()
require('source-map-support').install()

// check if env has the right fields. check environment.ts to edit environment fields
validateProcessEnvironmentFields()
const bot = new Telegraf(process.env.TELEGRAM_BOT_KEY)

type ConversationState = {
  lastUpdated: Date
  lastState: string
}

// storing Context objects to reuse, perhaps not needed?
const contextMap: Map<string, Context> = new Map<string, Context>()

// save conversation states
const conversationStateMap:  Map<string, ConversationState> = new Map<string, ConversationState>()

// in lieu of an actual table implementation
// both choreList and schedules map the user's username (fk)
// to the list of chores/schedules belonging to the user
const choreList: Map<string, string[]> = new Map<string, string[]>()
const schedules: Map<string, string[]> = new Map<string, string[]>()

const choreModel = ChoreFactory(sequelize, DataTypes)
const userModel = UserFactory(sequelize, DataTypes)

bot.start(async (ctx) => {
  ctx.reply(`Username: ${ctx.from.username!}`)
  if (contextMap.get(ctx.from.username!)) {
    ctx.reply(`Username: ${ctx.from.username} already registered`)
  } else {
    contextMap.set(ctx.from.username!, ctx)
    ctx.reply(`New User ${ctx.from.username} registered to contextMap`)
  }

  let user = await userModel.findOne({
    where: {
      username: ctx.from.username!,
    },
  })
  if (!user) {
    user = await userModel.create({
      createdAt: new Date(),
      username: ctx.from.username!,
    })
  }

  const listOfChores = await choreModel.findAll({
    where: {
      userId: user.id,
    },
  })

  if (listOfChores.length) {
    let startText = ''
    listOfChores.forEach((chore) => {
      startText += `${chore.createdAt} ${chore.description} ${chore.done} ${chore.id}\n`
    })
    ctx.reply(startText)
  }
  
  const inlineMessageKeyboard = Markup.keyboard([
    Markup.button.text('option1'),
    Markup.button.text('option2')
  ]).oneTime().resize()

  ctx.reply('Choose an option', inlineMessageKeyboard)
})

bot.command('addChore', (ctx) => {
  console.log('add')
  ctx.state.inProgressState = 'addChore'
  // check if description exists
})

bot.on('message', (ctx) => {
  console.log('message')
})

bot.hears('hello', (ctx) => {
  ctx.reply('hello there')
})
;(async () => {
  // set up tables if they don't exist
  choreModel.sync()
  userModel.sync()
  bot.launch()
})()
;(global as any).bot = bot
;(global as any).choreModel = choreModel
;(global as any).userModel = userModel
console.log('hello')
