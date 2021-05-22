import { Markup } from 'telegraf'
import { choreModel, userModel } from '../../services/db'
import { IBotCommand, MessageContext } from '../../typings/BotCommand'

const StartCommand: IBotCommand = class {
  static commandName = 'start'
  static callback = async (ctx: MessageContext) => {
    ctx.reply(`Username: ${ctx.from.username!}`)

    let user = await userModel.findOne({
      where: {
        username: ctx.from.username!,
      },
    })
    if (!user) {
      user = await userModel.create({
        telegramId: ctx.from.id,
        createdAt: new Date(),
        username: ctx.from.username!,
      })
      ctx.reply(`New User ${ctx.from.username} registered`)
    }

    const listOfChores = await choreModel.findAll({
      where: {
        userId: user.telegramId,
      },
    })

    if (listOfChores.length) {
      let startText = ''
      listOfChores.forEach((chore) => {
        startText += `${chore.createdAt} ${chore.description} ${chore.done} ${chore.id}\n`
      })
      ctx.reply(startText)
    }

    const inlineMessageKeyboard = Markup.keyboard([Markup.button.text('option1'), Markup.button.text('option2')])
      .oneTime()
      .resize()

    ctx.reply('Choose an option', inlineMessageKeyboard)
  }
}

export default StartCommand