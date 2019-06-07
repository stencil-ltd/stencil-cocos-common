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

    public currency: Currency = null

    private _sub = new Subscription<Currency>()

    protected update(dt: number): void {
        if (!this.currency) {
            this.currency = CurrencyManager.instance().get(this.key)
            if (!this.currency) return
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
        return this.currency.amount()
    }

    protected onInitialize() {}
    protected abstract onChange()

    private _onChange() {
        this.onChange()
        this._sub.notify(this.currency)
    }
}
