import {DataSource} from "./DataSource";

export class NumberDataSource extends DataSource<number> {

    public minValue: number|null = null
    public maxValue: number|null = null

    constructor(key: string, value: number = 0,  minValue: number|null = null, maxValue: number|null = null) {
        super(key, value);
        this.minValue = minValue;
        this.maxValue = maxValue;
    }

    protected validate(value: number): number {
        if (this.maxValue)
            value = Math.min(value, this.maxValue)
        if (this.minValue)
            value = Math.max(value, this.minValue)
        return value
    }
}