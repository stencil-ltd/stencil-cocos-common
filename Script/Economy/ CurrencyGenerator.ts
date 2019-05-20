import menu = cc._decorator.menu;
import property = cc._decorator.property;
import Currency from "./Currency";
import Controller from "../Lifecycle/Controller";
import CurrencyManager from "./CurrencyManager";
import Component = cc.Component;
import StencilStorage from "../Storage/StencilStorage";

const {ccclass} = cc._decorator;

@ccclass
@menu("Stencil/Econ/CurrencyGenerator")
export default class CurrencyGenerator extends Component {

    @property()
    public key: string = ''

    @property()
    public seconds: number = 30 * 60

    @property()
    public amount: number = 1

    private _currency: Currency
    private _fn: Function

    /**
     * time in milliseconds
     */
    public timeRemaining(): number {
        let mark = this.getMark()
        if (!mark) {
            mark = new Date()
            this.setMark(mark)
        }
        const now = new Date()
        const next = new Date(mark.valueOf() + this.seconds*1000)
        return next.valueOf() - now.valueOf()
    }

    private getKey(): string {
        return `__currency_generate_mark_${this.key}`
    }

    private getMark(): Date|null {
        return StencilStorage.default.getDateTime(this.getKey())
    }

    private setMark(date: Date) {
        StencilStorage.default.setDateTime(this.getKey(), date)
    }

    protected onLoad(): void {
        this._currency = CurrencyManager.instance().get(this.key)
    }

    protected onEnable(): void {
        this._fn = () => {
            this._onTick();
        }
        this.schedule(this._fn, 1.0, cc.macro.REPEAT_FOREVER)
    }

    private _onTick() {
        const remaining = this.timeRemaining()
        if (remaining <= 0) {
            this.setMark(new Date())
            this._currency.add(this.amount).save()
        }
    }

    protected onDisable(): void {
        this.unschedule(this._fn)
    }
}
