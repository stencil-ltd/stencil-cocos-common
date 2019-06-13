import menu = cc._decorator.menu;
import {NumberBaseView} from "./NumberBaseView";
import Label = cc.Label;
import property = cc._decorator.property;

const {ccclass} = cc._decorator;

@ccclass
@menu("Stencil/Data/NumberView")
export class NumberView extends NumberBaseView {

    @property()
    prefix: string = ''

    @property()
    animate: boolean = true

    private _label: Label
    private _amount: number = null
    private _goal = null

    protected onLoad(): void {
        this._label = this.getComponent(Label)
    }

    protected update(dt: number): void {
        super.update(dt);
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

    protected onChange() {
        if (this._amount == null) {
            this._amount = this.value()
        } else {
            this._lerp(this.value())
        }
    }

    private _lerp(amount: number) {
        this._goal = {
            start: this._amount,
            begin: Date.now(),
            duration: 1000,
            amount: amount
        }
    }
}
