import IStorageStrategy from "./IStorageStrategy";

export default class DummyStorageStrategy implements IStorageStrategy {

    private _map = {}

    clear() {
        this._map = {}
    }

    remove(key: string) {
        delete this._map[key]
    }

    getInt(key: string, def: number): number {
        return this._map[key] || def
    }

    getString(key: string): string | null {
        return this._map[key]
    }

    setInt(key: string, value: number) {
        this._map[key] = value
    }

    setString(key: string, value: string) {
        this._map[key] = value
    }
}