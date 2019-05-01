import Action = cc.Action;
import {sleepMs, sleepSeconds} from "../Foundation/StencilJs";
import AnimationState = cc.AnimationState;

declare global {
    export module cc {
        export interface Action {
            wait(): Promise<any>
        }
        export interface AnimationState {
            wait(): Promise<any>
        }
    }
}

async function awaitAction(action: Action): Promise<void> {
    while (!action.isDone()) await sleepMs(16)
}

async function awaitAnim(state: AnimationState): Promise<void> {
    return sleepSeconds(state.duration)
}

cc.Action.prototype['wait'] = function (): Promise<any> {
    return awaitAction(this)
}

cc.AnimationState.prototype['wait'] = function (): Promise<any> {
    return awaitAnim(this)
}