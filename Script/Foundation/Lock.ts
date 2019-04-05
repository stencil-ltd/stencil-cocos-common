import {Lockable} from "./Lockable";
import Subscription from "./Subscription";

export default class Lock implements Lockable {

    private counter = 0
    private sub: Subscription<boolean> = new Subscription<boolean>()

    isLocked(): boolean {
        return this.counter > 0
    }

    lock() {
        const locked = this.isLocked()
        this.counter++
        if (!locked) this.notify(true)
    }

    unlock() {
        const locked = this.isLocked()
        this.counter--
        if (this.counter < 0) this.counter = 0
        if (locked) this.notify(false)
    }

    subscribe(owner: any, fn: (boolean) => void) {
        this.sub.subscribe(owner, fn)
    }

    unsubscribe(owner: any) {
        this.sub.unsubscribe(owner)
    }

    private notify(value: boolean) {
        this.sub.notify(value)
    }
}