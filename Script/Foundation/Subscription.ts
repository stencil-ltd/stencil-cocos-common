import {Subscribeable} from "./Subscribeable";
import {uuid} from "./StencilJs";

export default class Subscription<T> implements Subscribeable<T> {

    private readonly subscribers: ((T) => void)[] = []
    private map = {}

    subscribe(owner: any, fn: (T) => void): any {
        fn = fn.bind(owner)
        const id = this.getId(owner)
        this.map[id] = this.map[id] || []
        this.map[id].push(fn)
        this.subscribers.push(fn)
    }

    unsubscribe(owner: any) {
        const id = this.getId(owner)
        const fns = this.map[id]
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
        this.map[id] = undefined
    }

    notify(value: T) {
        this.subscribers.forEach(sub => sub(value))
    }

    private getId(owner: Object): string {
        let id = owner['__stencil_sub_uuid']
        if (!id) {
            id = uuid()
            owner['__stencil_sub_uuid'] = id
        }
        return id
    }
}