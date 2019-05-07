import CurrencySpec from "./CurrencySpec";
import Currency from "./Currency";

export default class CurrencyManager {

    private static _instance: CurrencyManager = new CurrencyManager()
    public static instance() { return this._instance; }

    private readonly _map = new Map<string, Currency>()

    public register(spec: CurrencySpec): Currency {
        const retval = this.generate(spec)
        this.load(retval)
        this._map.set(spec.key, retval)
        return retval
    }

    public get(key: string): Currency {
        return this._map.get(key)
    }

    private generate(spec: CurrencySpec): Currency {
        return new Currency(this, spec)
    }

    public save(currency: Currency) {
        const key = `__currencies/default/${currency.key}`
        cc.sys.localStorage.setItem(key, JSON.stringify(currency.serialize()))
    }

    public clear() {
        this._map.forEach(value => {
            value.reset()
        })
    }

    private load(currency: Currency) {
        const key = `__currencies/default/${currency.key}`
        const saved = cc.sys.localStorage.getItem(key)
        if (saved) {
            currency.initialize(JSON.parse(saved))
        }
    }
}
