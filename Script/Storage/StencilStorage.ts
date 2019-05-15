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