import menu = cc._decorator.menu;
import property = cc._decorator.property;

const {ccclass} = cc._decorator;

@ccclass
@menu("Stencil/Widgets/Spinner")
export default class Spinner extends cc.Component {

    @property()
    duration: number = 2.5

    @property()
    clockwise: boolean = true

    protected start() {
        this.node.runAction(cc.rotateBy(this.duration, this.clockwise ? -360 : 360).repeatForever())
    }
}
