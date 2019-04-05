import property = cc._decorator.property;
import {DataSource} from "../../Data/DataSource";
import DataSources from "../../Data/DataSources";

export default abstract class DataView<T> extends cc.Component {

    @property
    key: string = ''

    protected source: DataSource<T>

    protected update(dt: number): void {
        if (!this.source) {
            this.source = DataSources.instance.get(this.key)
            if (!this.source) return
            this.source.subscribe(this, this.onChange)
            this.onInitialize()
            this.onChange()
        }
    }

    onDestroy(): void {
        if (!this.source) return
        this.source.unsubscribe(this)
    }

    public value(): T|null {
        if (!this.source) return null
        return this.source.value()
    }

    protected onInitialize() {}
    protected abstract onChange()
}
