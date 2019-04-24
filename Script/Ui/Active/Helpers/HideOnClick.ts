import menu = cc._decorator.menu;
import property = cc._decorator.property;
import requireComponent = cc._decorator.requireComponent;
import Button = cc.Button;

const {ccclass} = cc._decorator;

@ccclass
@requireComponent(Button)
@menu("Stencil/Ui/HideOnClick")
export default class HideOnClick extends cc.Component {

    @property(cc.Node)
    target: cc.Node = null

    protected onLoad(): void {
        if (!this.target) this.target = this.node
        this.node.on('click', this.onClick, this)
    }

    private onClick() {
        console.log(`hide ${this.target}`)
        this.target.active = false
    }
}
