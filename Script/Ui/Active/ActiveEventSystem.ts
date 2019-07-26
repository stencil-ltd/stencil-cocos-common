import menu = cc._decorator.menu;
import property = cc._decorator.property;
import {RegisterableComponent} from "../Lifecycle/RegisterableComponent";
import executionOrder = cc._decorator.executionOrder;
import {stencilLog} from "../../Logs/StencilLog";

const {ccclass} = cc._decorator;

@ccclass
@executionOrder(-100)
@menu("Stencil/Active/ActiveEventSystem")
export default class ActiveEventSystem extends cc.Component {

    @property()
    isRoot: boolean = false

    private components: RegisterableComponent[] = []

    protected onLoad(): void {
        stencilLog(`Active Event System is awake...`)
        if (this.isRoot) {
            this.components = cc.director.getScene().getComponentsInChildren(RegisterableComponent)
        } else {
            this.components = this.getComponentsInChildren(RegisterableComponent)
        }
        const registered: RegisterableComponent[] = []
        this.components.forEach(value => {
            if (!value.isRegistered) {
                value.onRegister()
                registered.push(value)
            }
        })

        registered.forEach(value => {
            value.didRegister()
        })

        stencilLog(`Active Event System is configured`)
    }

    protected onDestroy(): void {
        stencilLog(`Active Event System being destroyed`)
        this.components.forEach(value => {
            if (value.isRegistered) value.onUnregister()
        })
    }
}
