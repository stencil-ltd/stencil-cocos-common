import ActiveManager from "./ActiveManager";
import requireComponent = cc._decorator.requireComponent;

@requireComponent(ActiveManager)
export abstract class ActiveGate extends cc.Component {

    public manager: ActiveManager

    public register(manager: ActiveManager) {
        this.manager = manager
    }
    public didRegister() {}
    public onUnregister() {}

    public abstract check(): boolean

    public requestCheck() {
        this.manager && this.manager.check()
    }
}
