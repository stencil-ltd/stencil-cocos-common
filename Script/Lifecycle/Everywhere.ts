import menu = cc._decorator.menu;
import Singleton from "./Singleton";
import StencilLog from "../Logs/StencilLog";

const {ccclass} = cc._decorator;

@ccclass
@menu("Stencil/Lifecycle/Everywhere")
export default class Everywhere extends Singleton {

    protected onLoad(): void {
        StencilLog.log("Everywhere onLoad...")
        super.onLoad();
        StencilLog.log("Everywhere super onLoad complete!")
    }

}
