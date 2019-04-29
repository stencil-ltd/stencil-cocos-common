import Action = cc.Action;
import {sleep} from "../Foundation/StencilJs";

export async function awaitAction(action: Action): Promise<void> {
    while (!action.isDone()) await sleep(16)
}

export default class StencilWaiting {

}