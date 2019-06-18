import menu = cc._decorator.menu;
import property = cc._decorator.property;
import CurrencyGenerator from "./CurrencyGenerator";
import requireComponent = cc._decorator.requireComponent;
import StencilDates from "../Dates/StencilDates";
import Node = cc.Node;

const {ccclass} = cc._decorator;

@ccclass
@requireComponent(cc.Label)
@menu("Stencil/Econ/CurrencyCountdown")
export default class CurrencyCountdown extends cc.Component {

    @property(CurrencyGenerator)
    generator: CurrencyGenerator = null

    @property([Node])
    others: Node[] = []

    private _label: cc.Label

    protected onLoad(): void {
        this._label = this.getComponent(cc.Label)
    }

    protected update(dt: number): void {
        const remaining = this.generator.timeRemaining()
        if (remaining == null) {
            this._label.string = ''
            this.others.forEach(value => {
                value.active = false
            })
        } else {
            this.others.forEach(value => {
                value.active = true
            })
            this._label.string = StencilDates.hhmmssFormatTime(remaining)
        }
    }
}
