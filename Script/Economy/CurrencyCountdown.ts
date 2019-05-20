import menu = cc._decorator.menu;
import property = cc._decorator.property;
import CurrencyGenerator from "./ CurrencyGenerator";
import requireComponent = cc._decorator.requireComponent;
import StencilDates from "../Dates/StencilDates";

const {ccclass} = cc._decorator;

@ccclass
@requireComponent(cc.Label)
@menu("Stencil/Econ/CurrencyCountdown")
export default class CurrencyCountdown extends cc.Component {

    @property(CurrencyGenerator)
    generator: CurrencyGenerator

    private _label: cc.Label

    protected onLoad(): void {
        this._label = this.getComponent(cc.Label)
    }

    protected update(dt: number): void {
        const remaining = this.generator.timeRemaining()
        const date = new Date(remaining)
        this._label.string = StencilDates.hhmmssFormat(date)
    }
}
