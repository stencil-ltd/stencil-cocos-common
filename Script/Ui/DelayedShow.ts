import menu = cc._decorator.menu;
import {RegisterableComponent} from "./Lifecycle/RegisterableComponent";
import property = cc._decorator.property;

const {ccclass} = cc._decorator;

@ccclass
@menu("Stencil/Ui/DelayedShow")
export default class DelayedShow extends RegisterableComponent {

    @property()
    seconds: number = 1.0

    onRegister() {
        super.onRegister();
        this.node.active = false;
        this.scheduleOnce(() => this.node.active = true, this.seconds)
    }
}
