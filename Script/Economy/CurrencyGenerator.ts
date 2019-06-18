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
    public seconds: number = 3600 // 1 hour

    @property()
    public amount: number = 1

    @property()
    public max: number = 0

    private _currency: Currency
    private _fn: Function

    /**
     * time in milliseconds
     */
    public timeRemaining(): number|null {
        if (this.isMaxed()) return null
        return this.next().valueOf() - Date.now()
    }

    public next(): Date|null {
        if (this.isMaxed()) return null
        return new Date(this.getMark().valueOf() + this.seconds*1000)
    }

    private isMaxed(): boolean {
        return this.max && this._currency.amount() >= this.max
    }

    private getKey(): string {
        return `__currency_generate_mark_${this.key}`
    }

    private getMark(): Date {
        let mark = StencilStorage.default.getDateTime(this.getKey())
        if (!mark) {
            mark = new Date()
            this.setMark(mark)
        }
        return mark
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

    protected onDisable(): void {
        this.unschedule(this._fn)
    }

    private _onTick() {
        if (this.isMaxed()) {
            this.setMark(null)
            return
        }
        while (this.timeRemaining() <= 0) {
            this.setMark(this.next())
            this._currency.add(this.amount).andSave()
        }
    }
}
