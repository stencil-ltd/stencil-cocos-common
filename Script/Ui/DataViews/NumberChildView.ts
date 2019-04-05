import DataView from "./DataView"
import menu = cc._decorator.menu;
import {NumberBaseView} from "./NumberBaseView";

const {ccclass} = cc._decorator;

@ccclass
@menu("Stencil/Data/NumberChildView")
export class NumberChildView extends NumberBaseView {

    protected onChange() {
        let i = 0
        const val = this.value()
        this.node.children.forEach(value => {
            value.active = i++ < val
        })
    }
}
