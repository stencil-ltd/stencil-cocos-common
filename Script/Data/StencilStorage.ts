import StencilDates from "../Dates/StencilDates";

export default class StencilStorage {

    public static default: StencilStorage = new StencilStorage()

    static clear() {
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

    getInt(key: string, def: number = 0): number {
        return parseInt(cc.sys.localStorage.getItem(key) || `${def}`)
    }

    setInt(key: string, value: number) {
        cc.sys.localStorage.setItem(key, `${value}`)
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