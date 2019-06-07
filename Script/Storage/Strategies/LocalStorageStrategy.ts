import IStorageStrategy from "./IStorageStrategy";

export default class LocalStorageStrategy implements IStorageStrategy {

    clear() {
        cc.sys.localStorage.clear()
    }

    remove(key: string) {
        cc.sys.localStorage.removeItem(key)
    }

    getString(key: string): string|null {
        return cc.sys.localStorage.getItem(key)
    }

    setString(key: string, value: string) {
        cc.sys.localStorage.setItem(key, value)
    }

    getInt(key: string, def: number): number {
        return parseInt(cc.sys.localStorage.getItem(key) || `${def}`)
    }

    setInt(key: string, value: number) {
        cc.sys.localStorage.setItem(key, `${value}`)
    }

}