import menu = cc._decorator.menu;
import property = cc._decorator.property;

const {ccclass} = cc._decorator;

@ccclass
@menu("Stencil/Ui/HideOnClick")
export default class HideOnClick extends cc.Component {

    @property(cc.Node)
    target: cc.Node = null

    protected onLoad(): void {
        if (!this.target) this.target = this.node
        this.node.on('click', this.onClick, this)
    }

    private onClick() {
        this.target.active = false
    }
}
