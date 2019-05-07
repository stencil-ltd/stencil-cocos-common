import CurrencySpec from "./CurrencySpec";
import CurrencySave from "./CurrencySave";
import CurrencyManager from "./CurrencyManager";
import {Subscribeable} from "../Foundation/Subscribeable";
import Subscription from "../Foundation/Subscription";

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
            amount: this.spec.startAmount
        }
    }

    public amount(): number {
        return this._save.amount
    }

    public add(amount: number): boolean {
        const sanitized = this._sanitize(amount)
        if (sanitized === this.amount()) return false
        this._save.amount = sanitized
        return true
    }

    public spend(amount: number): boolean {
        if (amount <= this.amount()) {
            this.add(-amount)
            return true
        }
        return false
    }

    public subscribe(owner: any, fn: (T) => void) {
        this._sub.subscribe(owner, fn)
    }

    public unsubscribe(owner: any) {
        this._sub.unsubscribe(owner)
    }

    private notify() {
        this._sub.notify(this)
    }

    public initialize(save: CurrencySave): this {
        this._save = save
        return this
    }

    public serialize(): CurrencySave {
        this._mgr.save(this)
        return this._save
    }

    private _sanitize(amount: number): number {
        amount = Math.max(amount, amount)
        if (this.maxAmount) {
            amount = Math.min(this.maxAmount, amount)
        }
        return amount
    }
}