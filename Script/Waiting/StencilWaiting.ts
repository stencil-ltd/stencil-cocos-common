import Action = cc.Action;
import {sleepMs, sleepSeconds} from "../Foundation/StencilJs";
import AnimationState = cc.AnimationState;
import Base64 from "../Math/Base64";

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

export function makeRequest(method, url, base64: boolean = true): Promise<any> {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest()
        if (base64) xhr.responseType = 'arraybuffer'
        xhr.open(method, url, true)
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                if (base64) {
                    const blob = new Uint8Array(this.response)
                    const uri = "data:image/jpeg;base64," + Base64.encode(blob)
                    resolve(uri)
                } else {
                    resolve(xhr.response)
                }
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}