import {RegisterableComponent} from "../Ui/Lifecycle/RegisterableComponent";
import property = cc._decorator.property;
import ccclass = cc._decorator.ccclass;

@ccclass
export default abstract class Controller extends RegisterableComponent {

    private static map = new Map<Function, Controller>()
    public static get<T extends Controller>(ctor: Function): T|null {
        return this.map.get(ctor) as T
    }

    @property()
    hideAtStart: boolean = false

    protected onControllerAwake() {}

    protected onLoad(): void {
        this.setInstance()
        this.onControllerAwake()
    }

    protected onEnable(): void {
        this.setInstance()
    }

    protected onDisable(): void {
        // just to get symmetry with intellisense super calls.
    }

    onRegister() {
        super.onRegister();
        this.setInstance()
        if (this.hideAtStart) {
            this.node.active = false
        }
    }

    onUnregister() {
        super.onUnregister();
        this.clearInstance()
    }

    private setInstance() {
        Controller.map.set(this.constructor, this)
    }

    private clearInstance() {
        if (Controller.get(this.constructor) == this)
            Controller.map.delete(this.constructor)
    }

}
