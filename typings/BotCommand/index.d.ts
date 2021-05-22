import { Composer, Context, Scenes, Telegraf } from "telegraf";
import { Update, Message, User } from "typegram";
import { ExpandDeep } from "type-expand"
import { AllSceneContexts } from "../../bot-scenes";

declare class _IBotCommand {
  static commandName: string
  static callback: (ctx: MessageContext) => Promise<void> | void
}

export type IBotCommand = typeof _IBotCommand
export type MessageContext = Context<{ message: Update.New & Update.NonChannel& Message.TextMessage; update_id: number; }> & Scenes.SceneContext<AllSceneContexts>
