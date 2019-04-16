import property = cc._decorator.property;
import StateMachine from "../../../State/StateMachine";

export abstract class StateButton<T> extends cc.Component {

    @property()
    public key: string = ''

    public abstract state: T = 0 as unknown as T

    protected onLoad(): void {
        this.node.on('click', this.onClick, this)
    }

    private onClick() {
        StateMachine.get(this.key).requestState(this.state)
    }
}
