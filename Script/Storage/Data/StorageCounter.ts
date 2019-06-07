import StencilStorage from "../StencilStorage";

export default class StorageCounter {

    public readonly key: string
    private readonly storage = StencilStorage.default

    constructor(key: string) {
        this.key = key;
    }

    public get value(): number {
        return this.storage.getInt(this.key)
    }

    public set value(value: number) {
        this.storage.setInt(this.key, value)
    }

    public increment(amount = 1) {
        this.value += amount
    }
}