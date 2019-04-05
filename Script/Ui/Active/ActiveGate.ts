import ActiveManager from "./ActiveManager";
import Component = cc.Component;
import requireComponent = cc._decorator.requireComponent;

@requireComponent(ActiveManager)
export default abstract class ActiveGate extends Component {

    public manager: ActiveManager

    public register(manager: ActiveManager) {
        this.manager = manager
    }
    public didRegister() {}
    public onUnregister() {}
    public didUnregister() {}

    public abstract check(): boolean

    public requestCheck() {
        this.manager && this.manager.check()
    }
}
