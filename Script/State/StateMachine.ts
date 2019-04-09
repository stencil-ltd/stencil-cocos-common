import Subscription from "../Foundation/Subscription";
import Lock from "../Foundation/Lock";
import {StateChange} from "./StateChange";
import {Subscribeable} from "../Foundation/Subscribeable";
import {Lockable} from "../Foundation/Lockable";
import {Keyable} from "../Foundation/Keyable";

export default class StateMachine<T> implements Subscribeable<T>, Lockable, Keyable {

    private static map = new Map<string, StateMachine<any>>()

    public static get<T>(key: string, create: boolean = true): StateMachine<T> {
        let retval = this.map.get(key) as StateMachine<T>
        if (!retval && create) {
            retval = new StateMachine<T>(key, 0 as unknown as T)
            this.map.set(key, retval)
        }
        return retval
    }

    public readonly initialState: T
    public readonly history: T[] = []
    public readonly key: string

    private state: T

    private _lock: Lock = new Lock()
    private _sub = new Subscription<StateChange<T>>()

    private constructor(key: string, state: T) {
        this.key = key
        this.initialState = state;
        this.state = state;
        console.log(`machine create: '${this.key}'`)
    }

    getState(): T {
        return this.state
    }

    requestState(state: T, force: boolean = false, notify: boolean = true, replaceHistory: boolean = false): boolean {
        if (!force && state == this.state) return false
        if (!force && this.isLocked()) return false
        if (replaceHistory && this.history.length > 0) {
            this.history.splice(this.history.length - 1, 1)
        }
        this.history.push(state)
        this.setState(state)
        return true
    }

    popState(): T|null {
        if (this.isLocked()) return null
        const index = this.history.length - 1
        if (index < 0) return null;
        const retval = this.history[index]
        this.history.splice(index, 1)
        const state = this.history.length > 0 ? this.history[this.history.length - 1] : this.initialState
        this.setState(state)
        return retval;
    }

    reset() {
        console.log(`machine '${this.key}' reset`)
        if (this.isLocked()) return
        this.history.length = 0
        this.requestState(this.initialState, true)
    }

    subscribe(owner: any, fn: (T) => void) {
        this._sub.subscribe(owner, fn)
    }

    unsubscribe(owner: any) {
        this._sub.unsubscribe(owner)
    }

    isLocked(): boolean {
        return this._lock.isLocked();
    }

    lock() {
        this._lock.lock()
    }

    unlock() {
        this._lock.unlock()
    }

    private setState(state: T) {
        const old = this.state
        this.state = state
        this.notify(old)
    }

    private notify(old: T | null) {
        console.log(`machine '${this.key}' [${old} => ${this.state}]`)
        this._sub.notify(new StateChange<T>(old, this.state))
    }

}