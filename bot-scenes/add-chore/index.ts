import { Context, Markup, Scenes } from 'telegraf'
import { Message } from 'typegram'
import { choreModel } from '../../services/db'

const addChoreScene = new Scenes.BaseScene<AddChoreContext>('ADD_CHORE')

export interface AddChoreSceneSessionData extends Scenes.SceneSessionData {
  sceneSessionDataTest: string
}

export interface AddChoreSession extends Scenes.SceneSession<AddChoreSceneSessionData> {
  choreName: string
  isWaitForChoreName: boolean
  isWaitForConfirmation: boolean
  isChoreNameEntered: boolean
}
export interface AddChoreContext extends Context {
  session: AddChoreSession
  scene: Scenes.SceneContextScene<AddChoreContext, AddChoreSceneSessionData>
}
addChoreScene.enter((ctx) => {
  ctx.reply('enter chore name')
  ctx.session.isWaitForChoreName = true
})

addChoreScene.leave((ctx) => {
  console.log('left addChore scene')
})

addChoreScene.on('text', (ctx) => {
  if (ctx.session.isWaitForChoreName) {
    // casted to Message.TextMessage as exported type Message is bugged
    ctx.session.choreName = (ctx.message as Message.TextMessage).text
    ctx.session.isWaitForChoreName = false
    ctx.session.isWaitForConfirmation = true

    const keyboard = Markup.inlineKeyboard([
      [
        Markup.button.callback('yes', 'yes'),
        Markup.button.callback('no', 'no')
      ]
    ])

    ctx.reply(`Add chore <${ctx.session.choreName}>?`, keyboard)
  }
})

addChoreScene.action('yes', async (ctx) => {
  if (ctx.session.isWaitForConfirmation) {
    await choreModel.create({
      userId: ctx.from!.id.toString(),
      description: ctx.session.choreName,
      done: false,
      scheduleId: 'no schedule',
      createdAt: new Date()
    })
    ctx.reply(`Chore <${ctx.session.choreName}> added`)
    resetContext(ctx)
    addChoreScene.leave()
  }
})

addChoreScene.action('no', (ctx) => {
  ctx.reply(`Add chore canceled`)
  resetContext(ctx)
  addChoreScene.leave()
})

const resetContext = (ctx: AddChoreContext) => {
  ctx.session.choreName = ''
  ctx.session.isWaitForChoreName = false
  ctx.session.isWaitForConfirmation = false
  ctx.session.isChoreNameEntered = false
}

export default addChoreScene
