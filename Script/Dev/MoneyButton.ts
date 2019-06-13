import menu = cc._decorator.menu;
import property = cc._decorator.property;
import requireComponent = cc._decorator.requireComponent;
import DevOnly from "./DevOnly";
import Button = cc.Button;
import DataSources from "../Data/DataSources";
import CurrencyManager from "../Economy/CurrencyManager";

const {ccclass} = cc._decorator;

@ccclass
@requireComponent(Button)
@menu("Stencil/Dev/MoneyButton")
export default class MoneyButton extends cc.Component {

    @property()
    devOnly: boolean = false

    @property()
    key: string = ''

    @property()
    amount: number = 1000

    @property()
    dataSource: boolean = false

    protected onLoad(): void {
        this.node.on('click', this._onClick, this)
    }

    protected start(): void {
        if (!CC_DEBUG && this.devOnly)
            this.node.active = false
    }

    private _onClick() {
        if (this.dataSource) {
            const source = DataSources.instance.get(this.key)
            source.increment(this.amount)
            DataSources.instance.save()
        } else {
            const currency = CurrencyManager.instance().get(this.key)
            currency.add(this.amount).andSave()
        }
    }
}
