import menu = cc._decorator.menu;
import property = cc._decorator.property;
import Prefab = cc.Prefab;
import {RegisterableComponent} from "./Lifecycle/RegisterableComponent";

const {ccclass} = cc._decorator;

@ccclass
@menu("Stencil/Ui/PrefabLoader")
export default class PrefabLoader extends RegisterableComponent {

    @property(Prefab)
    prefab: Prefab = null

    onRegister() {
        super.onRegister();
        this.node.addChild(cc.instantiate(this.prefab))
    }
}
