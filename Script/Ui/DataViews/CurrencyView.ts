import property = cc._decorator.property;
import ccclass = cc._decorator.ccclass;
import Currency from "../../Economy/Currency";
import CurrencyManager from "../../Economy/CurrencyManager";

@ccclass()
export default abstract class CurrencyView extends cc.Component {

    @property
    key: string = ''

    public currency: Currency = null

    protected update(dt: number): void {
        if (!this.currency) {
            this.currency = CurrencyManager.instance().get(this.key)
            if (!this.currency) return
            this.currency.subscribe(this, this.onChange)
            this.onInitialize()
            this.onChange()
        }
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
}
