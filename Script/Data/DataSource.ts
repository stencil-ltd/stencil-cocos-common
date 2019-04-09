import {Subscribeable} from "../Foundation/Subscribeable";
import Subscription from "../Foundation/Subscription";

export class DataSource<T> implements Subscribeable<T> {

    readonly key: string

    private initial: T

    private _value: T
    public value() { return this._value }

    private _markedValue: T
    public markedValue() { return this._markedValue || 0 }

    private sub = new Subscription<T>()

    public constructor(key: string, value: T) {
        this.key = key;
        this._value = this.initial = value
    }

    public subscribe(owner: any, fn: (T) => void) {
        this.sub.subscribe(owner, fn)
    }

    public unsubscribe(owner) {
        this.sub.unsubscribe(owner)
    }

    private notify(value: T) {
        this.sub.notify(value)
    }

    public increment(amount: any = 1): boolean {
        console.log(`increment ${this.key} by ${amount}`)
        return this.setValue(this.value() + amount)
    }

    public setValue(value: T): boolean {
        value = this.validate(value)
        if (this._value != value) {
            this._value = value
            this.notify(value)
            return true
        }
        return false
    }

    public mark() {
        this._markedValue = this._value
        this.notify(this._value)
    }

    public unmark() {
        this._markedValue = null
        this.notify(this._value)
    }

    public reset() {
        this.unmark()
        this.setValue(this.initial)
    }

    protected validate(value: T): T {
        return value
    }
}