import menu = cc._decorator.menu;
import property = cc._decorator.property;
import {RegisterableComponent} from "../Lifecycle/RegisterableComponent";
import executionOrder = cc._decorator.executionOrder;

const {ccclass} = cc._decorator;

@ccclass
@executionOrder(-100)
@menu("Stencil/Active/ActiveEventSystem")
export default class ActiveEventSystem extends cc.Component {

    @property()
    isRoot: boolean = false

    private components: RegisterableComponent[] = []

    protected onLoad(): void {
        console.log(`Active Event System is awake...`)
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
    }

    protected onDestroy(): void {
        this.components.forEach(value => {
            if (value.isRegistered) value.onUnregister()
        })
    }
}
