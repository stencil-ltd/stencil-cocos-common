import property = cc._decorator.property;
import ccclass = cc._decorator.ccclass;
import Currency from "../../Economy/Currency";
import CurrencyManager from "../../Economy/CurrencyManager";
import Subscription from "../../Foundation/Subscription";
import {Subscribeable} from "../../Foundation/Subscribeable";

@ccclass()
export default abstract class CurrencyView extends cc.Component implements Subscribeable<Currency> {

    @property
    key: string = ''

    @property()
    markOnAwake: boolean = false

    private currency: Currency = null

    private _sub = new Subscription<Currency>()
    private _marked = 0

    public revert() {
        if (this.currency) {
            this.currency.set(this._marked)
        }
    }

    public mark(notify: boolean = true) {
        if (!this.currency) return
        this._marked = this.currency.amount()
        if (notify) this._onChange()
    }

    protected update(dt: number): void {
        if (!this.currency) {
            this.currency = CurrencyManager.instance().get(this.key)
            if (!this.currency) return
            if (this.markOnAwake) this.mark(false)
            this.currency.subscribe(this, this._onChange)
            this.onInitialize()
            this._onChange()
        }
    }

    subscribe(owner: any, fn: (T) => void) {
        this._sub.subscribe(owner, fn)
    }

    unsubscribe(owner: any) {
        this._sub.unsubscribe(owner)
    }

    onDestroy(): void {
        if (!this.currency) return
        this.currency.unsubscribe(this)
    }

    public amount(): number|null {
        if (!this.currency) return null
        return this.currency.amount() - this._marked
    }

    protected onInitialize() {}
    protected abstract onChange()

    private _onChange() {
        this.onChange()
        this._sub.notify(this.currency)
    }
}
