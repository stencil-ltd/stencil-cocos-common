import DataView from "./DataView"
import menu = cc._decorator.menu;
import property = cc._decorator.property;
import value = cc.js.value;

export abstract class NumberBaseView extends DataView<number> {

    @property
    useMarkedValue: boolean = false

    protected onInitialize() {
        super.onInitialize()
    }

    value(): number {
        let retval = super.value()!!
        if (this.useMarkedValue) retval -= this.source.markedValue()
        return retval
    }
}
