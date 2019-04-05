import menu = cc._decorator.menu;
import property = cc._decorator.property;
import {RegisterableComponent} from "../Lifecycle/RegisterableComponent";

const {ccclass} = cc._decorator;

@ccclass
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
            value.isRegistered = true
        })

        registered.forEach(value => {
            value.didRegister()
        })
    }

    protected onDestroy(): void {
        this.components.forEach(value => {
            if (value.isRegistered)
                value.willUnregister()
        })
        this.components.forEach(value => {
            if (value.isRegistered)
                value.didUnregister()
            value.isUnregistered = true
        })
    }
}
