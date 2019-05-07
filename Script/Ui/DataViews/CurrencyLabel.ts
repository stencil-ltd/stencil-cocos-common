import menu = cc._decorator.menu;
import CurrencyView from "./CurrencyView";
import requireComponent = cc._decorator.requireComponent;
import Label = cc.Label;
import property = cc._decorator.property;

const {ccclass} = cc._decorator;

@ccclass
@requireComponent(Label)
@menu("Stencil/Ui/CurrencyLabel")
export default class CurrencyLabel extends CurrencyView {

    @property()
    public prefix: string = ''

    private _label: Label

    protected onLoad(): void {
        this._label = this.getComponent(Label)
    }

    protected onChange() {
        const amount = this.amount()
        if (amount) {
            this._label.string = `${this.prefix}${this.amount()}`
        } else {
            this._label.string = ''
        }
    }
}
