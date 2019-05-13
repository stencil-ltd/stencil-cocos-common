import menu = cc._decorator.menu;
import property = cc._decorator.property;
import Currency from "./Currency";
import Controller from "../Lifecycle/Controller";
import CurrencyManager from "./CurrencyManager";
import Component = cc.Component;

const {ccclass} = cc._decorator;

@ccclass
@menu("Stencil/Econ/ CurrencyGenerator")
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
        const mark = this.getMark() || new Date()
        const now = new Date()
        const next = new Date(mark.valueOf() + this.seconds*1000)
        return next.valueOf() - now.valueOf()
    }

    private getKey(): string {
        return `__currency_generate_mark_${this.key}`
    }

    private getMark(): Date|null {
        const str = cc.sys.localStorage.getItem(this.getKey()) as string
        if (!str) return null
        return new Date(str)
    }

    private setMark(date: Date) {
        cc.sys.localStorage.setItem(this.getKey(), `${Date.now()}`)
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