import property = cc._decorator.property;
import ccclass = cc._decorator.ccclass;
import Currency from "../../Economy/Currency";
import CurrencyManager from "../../Economy/CurrencyManager";

@ccclass()
export default abstract class CurrencyView extends cc.Component {

    @property
    key: string = ''

    protected source: Currency = null

    protected update(dt: number): void {
        if (!this.source) {
            this.source = CurrencyManager.instance().get(this.key)
            if (!this.source) return
            this.source.subscribe(this, this.onChange)
            this.onInitialize()
            this.onChange()
        }
    }

    onDestroy(): void {
        if (!this.source) return
        this.source.unsubscribe(this)
    }

    public amount(): number|null {
        if (!this.source) return null
        return this.source.amount()
    }

    protected onInitialize() {}
    protected abstract onChange()
}
