import menu = cc._decorator.menu;
import requireComponent = cc._decorator.requireComponent;
import Label = cc.Label;
import property = cc._decorator.property;

const {ccclass} = cc._decorator;

@ccclass
@requireComponent(Label)
@menu("Stencil/Text/NumberLabel")
export default class NumberLabel extends cc.Component {

    @property()
    prefix: string = ''

    @property()
    duration: number = 0.7

    private _label: Label = null
    private _amount: number = null
    private _goal = null

    public get amount(): number {
        return this._goal.amount
    }

    public set amount(amount: number) {
        if (this._amount == null) this._amount = amount
        this._lerp(amount)
    }

    protected onLoad(): void {
        this._label = this.getComponent(Label)
    }

    protected update(dt: number): void {
        if (this._goal == null) return
        const progress = Date.now() - this._goal.begin
        const norm = Math.min(1, progress / this._goal.duration)
        this._amount = Math.floor(cc.misc.lerp(this._goal.start, this._goal.amount, norm))
        if (this._goal.amount === this._amount) this._goal = null
    }

    protected lateUpdate(): void {
        if (this._amount != null) {
            this._label.string = `${this.prefix}${this._amount}`
        } else {
            this._label.string = ''
        }
    }

    private _lerp(amount: number) {
        this._goal = {
            start: this._amount,
            begin: Date.now(),
            duration: this.duration * 1000,
            amount: amount
        }
    }
}
