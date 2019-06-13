import menu = cc._decorator.menu;
import {NumberBaseView} from "./NumberBaseView";
import Label = cc.Label;

const {ccclass} = cc._decorator;

@ccclass
@menu("Stencil/Data/NumberView")
export class NumberView extends NumberBaseView {

    private label: Label = null

    protected onLoad(): void {
        this.label = this.label || this.node.getComponent(cc.Label)
        this.label.string = ''
    }

    protected onChange() {
        this.label.string = `${this.value()}`
    }
}
