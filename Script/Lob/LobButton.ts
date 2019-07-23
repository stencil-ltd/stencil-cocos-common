import menu = cc._decorator.menu;
import requireComponent = cc._decorator.requireComponent;
import Lobber from "./Lobber";
import Button = cc.Button;
import property = cc._decorator.property;

const {ccclass} = cc._decorator;

@ccclass
@requireComponent(Lobber)
@requireComponent(Button)
@menu("Stencil/Lobbers/LobButton")
export default class LobButton extends cc.Component {

    @property()
    amount: number = 10

    protected start() {
        this.node.on('click', this._onClick, this)
    }

    private _onClick() {
        this.getComponent(Lobber).lobMany(this.amount)
    }
}
