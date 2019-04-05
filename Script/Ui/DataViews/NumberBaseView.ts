import DataView from "./DataView"
import menu = cc._decorator.menu;
import property = cc._decorator.property;
import value = cc.js.value;

export abstract class NumberBaseView extends DataView<number> {

    @property
    markFromStart: boolean = false

    private startValue: number = 0

    protected onInitialize() {
        super.onInitialize()
        this.startValue = this.source.value()
    }

    value(): number {
        let retval = super.value()!!
        if (this.markFromStart) retval -= this.startValue
        return retval
    }
}
