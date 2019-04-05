import {Subscribeable} from "./Subscribeable";

export default class Subscription<T> implements Subscribeable<T> {

    private readonly subscribers: ((T) => void)[] = []
    private map = {}

    subscribe(owner: any, fn: (T) => void): any {
        fn = fn.bind(owner)
        this.map[owner] = this.map[owner] || []
        this.map[owner].push(fn)
        this.subscribers.push(fn)
    }

    unsubscribe(owner: any) {
        const fns = this.map[owner]
        if (fns) {
            fns.forEach(fn => {
                const i = this.subscribers.indexOf(fn)
                if (i == -1) {
                    console.error(`could not find ${fn} to unsubscribe`)
                    return
                }
                this.subscribers.splice(i, 1)
            })
        }
        this.map[owner] = undefined
    }

    notify(value: T) {
        this.subscribers.forEach(sub => sub(value))
    }
}