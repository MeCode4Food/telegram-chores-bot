import { Scenes } from "telegraf";
import { SceneContext } from "telegraf/typings/scenes";
import addChoreScene, { AddChoreContext } from "./add-chore";

export type AllSceneContexts = AddChoreContext
export const sceneStages = new Scenes.Stage<AllSceneContexts>([ addChoreScene ])
