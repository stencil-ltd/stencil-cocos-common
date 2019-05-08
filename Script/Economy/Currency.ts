import CurrencySpec from "./CurrencySpec";
import CurrencySave from "./CurrencySave";
import CurrencyManager from "./CurrencyManager";
import {Subscribeable} from "../Foundation/Subscribeable";
import Subscription from "../Foundation/Subscription";
import CurrencyOperation from "./CurrencyOperation";

export default class Currency implements CurrencySpec, Subscribeable<number> {

    public readonly spec: CurrencySpec
    public readonly key: string
    public readonly maxAmount: number
    public readonly minAmount: number
    public readonly startAmount: number

    private _save: CurrencySave
    private _mgr: CurrencyManager
    private _sub = new Subscription<Currency>()

    constructor(mgr: CurrencyManager, spec: CurrencySpec) {
        this._mgr = mgr
        this.spec = spec
        this.key = this.spec.key
        this.maxAmount = this.spec.maxAmount
        this.minAmount = this.spec.minAmount || 0
        this.startAmount = this.spec.startAmount || 0
        this._save = {
            amount: this.startAmount
        }
    }

    public amount(): number {
        return this._save.amount
    }

    public set(amount: number): CurrencyOperation {
        if (amount === this._save.amount) return this._fail()
        this._save.amount = amount
        this.notify()
        return this._succeed()
    }

    public add(amount: number): CurrencyOperation {
        let total = this._save.amount + amount
        total = this._sanitize(total)
        return this.set(total)
    }

    public spend(amount: number): CurrencyOperation {
        if (!amount) return this._succeed()
        if (amount <= this.amount()) {
            this.add(-amount)
            return this._succeed()
        }
        return this._fail()
    }

    public subscribe(owner: any, fn: (T) => void) {
        this._sub.subscribe(owner, fn)
    }

    public unsubscribe(owner: any) {
        this._sub.unsubscribe(owner)
    }

    public save() {
        this._mgr.save(this)
    }

    private notify() {
        this._sub.notify(this)
    }

    public initialize(save: CurrencySave): this {
        console.log(`Currency: Init ${this.key} with ${JSON.stringify(save, null, 2)}`)
        this._save = save
        return this
    }

    public reset() {
        this._save = {
            amount: this.startAmount
        }
        this.save()
    }

    public serialize(): CurrencySave {
        return this._save
    }

    private _sanitize(amount: number): number {
        amount = Math.max(amount, amount)
        if (this.maxAmount) {
            amount = Math.min(this.maxAmount, amount)
        }
        return amount
    }

    private _succeed() {
        return new CurrencyOperation(this, true)
    }

    private _fail() {
        return new CurrencyOperation(this, false)
    }
}