import property = cc._decorator.property;
import ActiveManager from "../ActiveManager";
import {Keyable} from "../../../Foundation/Keyable";
import StateMachine from "../../../State/StateMachine";
import {StateChange} from "../../../State/StateChange";

import {ActiveGate} from "../ActiveGate";

const {ccclass} = cc._decorator;

export abstract class StateGate<T> extends ActiveGate implements Keyable {

    @property key: string = ""
    @property invert: boolean = false
    @property revertOnExit: boolean = false
    @property takeStateOnActive: boolean = false

    abstract states: T[] = []

    public machine: StateMachine<T>

    private revertState: T | null = null

    public getState(): T {
        return this.machine.getState()
    }

    check(): boolean {
        let visible = this.states.includes(this.getState())
        if (this.invert) visible = !visible
        return visible
    }

    register(manager: ActiveManager) {
        super.register(manager);
        this.machine = StateMachine.get<T>(this.key)
        this.machine.subscribe(this, this.onState)
    }

    onUnregister() {
        this.machine.unsubscribe(this)
    }

    protected onEnable(): void {
        if (this.takeStateOnActive)
            this.machine.requestState(this.states[0])
    }

    protected onDisable(): void {
        if (this.revertOnExit && this.revertState && this.states.includes(this.getState())) {
            this.machine.requestState(this.revertState)
            this.revertState = null
        }
    }

    private onState(change: StateChange<T>) {
        if (change.oldValue && this.states && this.states.includes(this.getState()))
            this.revertState = change.oldValue
        this.requestCheck()
    }
}
