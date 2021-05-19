import dotenv from 'dotenv'
import { validateProcessEnvironmentFields } from './environment'
import { Context, Telegraf } from 'telegraf'
import { setTimeout } from 'timers'
dotenv.config()

// check if env has the right fields. check environment.ts to edit environment fields
validateProcessEnvironmentFields()
const bot = new Telegraf(process.env.TELEGRAM_BOT_KEY)

const contextMap: Map<string, Context> = new Map<string, Context>()
const timers: Map<string, NodeJS.Timer> = new Map<string, NodeJS.Timer>()

// in lieu of an actual table implementation
// both choreList and schedules map the user's username (fk) 
// to the list of chores/schedules belonging to the user
const choreList: Map<string, string[]> = new Map<string, string[]>()
const schedules: Map<string, string[]> = new Map<string, string[]>()

bot.start((ctx) => {
  ctx.reply(`Username: ${ctx.from.username!}`)
  if (contextMap.get(ctx.from.username!)) {
    ctx.reply(`Username: ${ctx.from} already registered`)
  } else {
    contextMap.set(ctx.from.username!, ctx)
    ctx.reply(`New User ${ctx.from} registered`)
  }
})
bot.hears('hello', (ctx) => {
  ctx.reply('hello there')
})
bot.launch()
console.log('hello')
