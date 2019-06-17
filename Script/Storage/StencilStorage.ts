import StencilDates from "../Dates/StencilDates";
import IStorageStrategy from "./Strategies/IStorageStrategy";
import LocalStorageStrategy from "./Strategies/LocalStorageStrategy";
import DummyStorageStrategy from "./Strategies/DummyStorageStrategy";

export default class StencilStorage {

    public static default: StencilStorage = new StencilStorage(new LocalStorageStrategy())
    public static fake: StencilStorage = new StencilStorage(new DummyStorageStrategy())

    private readonly _strategy: IStorageStrategy

    constructor(strategy: IStorageStrategy) {
        this._strategy = strategy;
    }

    clear() {
        this._strategy.clear()
    }

    remove(key: string) {
        this._strategy.remove(key)
    }

    getString(key: string): string|null {
        return this._strategy.getString(key)
    }

    setString(key: string, value: string) {
        this._strategy.setString(key, value)
    }

    getInt(key: string, def: number = 0): number {
        return this._strategy.getInt(key, def)
    }

    setInt(key: string, value: number) {
        this._strategy.setInt(key, value)
    }

    getBoolean(key: string, def: boolean = false): boolean {
        const intdef = def ? 1 : 0
        return this._strategy.getInt(key, intdef) != 0
    }

    setBoolean(key: string, value: boolean) {
        this._strategy.setInt(key, value ? 1 : 0)
    }

    getDateTime(key: string): Date|null {
        var str = this.getString(key)
        if (!str) return null
        return new Date(parseInt(str))
    }

    setDateTime(key: string, value: Date) {
        if (!value)
            this.remove(key)
        else
            this.setString(key, `${value.valueOf()}`)
    }

    getDate(key: string): Date|null {
        return StencilDates.fromDayFormat(this.getString(key))
    }

    setDate(key: string, value: Date) {
        if (!value)
            this.remove(key)
        else
            this.setString(key, StencilDates.dayFormat(value))
    }
}