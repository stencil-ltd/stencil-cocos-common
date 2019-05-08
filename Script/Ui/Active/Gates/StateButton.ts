import property = cc._decorator.property;
import StateMachine from "../../../State/StateMachine";

export abstract class StateButton<T> extends cc.Component {

    @property()
    public key: string = ''

    @property()
    public popStateInstead: boolean = false

    @property()
    public replaceHistory: boolean = false

    public abstract state: T = 0 as unknown as T

    protected onLoad(): void {
        this.node.on('click', this.onClick, this)
    }

    private onClick() {
        const machine = StateMachine.get(this.key)
        if (this.popStateInstead) {
            machine.popState()
        } else {
            machine.requestState(this.state, false, true, this.replaceHistory)
        }
    }
}
