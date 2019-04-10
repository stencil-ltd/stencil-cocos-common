import DataView from "./DataView"
import property = cc._decorator.property;

export abstract class NumberBaseView extends DataView<number> {

    @property()
    useMarkedValue: boolean = false

    value(): number {
        let retval = super.value()!!
        if (this.useMarkedValue) retval -= this.source.markedValue()
        return retval
    }
}
