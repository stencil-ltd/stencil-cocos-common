import menu = cc._decorator.menu;
import {RegisterableComponent} from "../Lifecycle/RegisterableComponent";
import property = cc._decorator.property;
import {ActiveGate} from "./ActiveGate";

const {ccclass} = cc._decorator;

export enum ActiveOperation {
    And, Or
}

@ccclass
@menu("Stencil/Active/ActiveManager")
export default class ActiveManager extends RegisterableComponent {

    @property({type: cc.Enum(ActiveOperation)})
    operation: ActiveOperation = ActiveOperation.Or

    public readonly gates: ActiveGate[] = []

    onRegister() {
        super.onRegister()
        this.gates.push(...this.getComponents(ActiveGate))
        this.gates.forEach(value => value.register(this))
    }

    didRegister() {
        super.didRegister();
        if (this.gates) this.gates.forEach(value => value.didRegister())
        this.check()
    }

    onUnregister() {
        if (this.gates) this.gates.forEach(value => value.onUnregister())
        super.onUnregister();
    }

    check() {
        if (this.gates.length == 0) return
        if (!this.enabled) return
        let active = this.operation == ActiveOperation.And
        let hasActive = false
        this.gates.forEach(g => {
            if (g == null || !g.enabled) return
            let check = g.check()
            if (check == null) return
            hasActive = true
            switch (this.operation) {
                case ActiveOperation.And:
                    active = active && check
                    break;
                case ActiveOperation.Or:
                    active = active || check
                    break;

            }
        })

        if (hasActive) {
            this.setActiveInternal(active)
        }
    }

    private setActiveInternal(active: boolean) {
        if (active == this.node.active) return
        this.node.active = active
    }
}