import {RegisterableComponent} from "../Ui/Lifecycle/RegisterableComponent";

export default abstract class Controller extends RegisterableComponent {

    private static map = new Map<Function, Controller>()
    public static get<T extends Controller>(ctor: Function): T|null {
        return this.map.get(ctor) as T
    }

    protected onControllerAwake() {}

    protected onLoad(): void {
        super.onLoad();
        this.setInstance()
        this.onControllerAwake()
    }

    protected onEnable(): void {
        super.onEnable()
        this.setInstance()
    }

    onRegister() {
        super.onRegister();
        this.setInstance()
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
