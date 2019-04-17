import menu = cc._decorator.menu;
import requireComponent = cc._decorator.requireComponent;
import Mask = cc.Mask;

const {ccclass} = cc._decorator;

@ccclass
@requireComponent(Mask)
@menu("Stencil/Ui/MaskOnPlay")
export default class MaskOnPlay extends cc.Component {

    protected onEnable(): void {
        this.getComponent(Mask).enabled = true
    }
}
