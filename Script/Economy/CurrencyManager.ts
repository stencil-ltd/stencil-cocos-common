import CurrencySpec from "./CurrencySpec";
import Currency from "./Currency";
import CurrencyPersistence from "./Persistence/CurrencyPersistence";
import LocalCurrencyPersistence from "./Persistence/LocalCurrencyPersistence";

export default class CurrencyManager {

    private static _instance: CurrencyManager = new CurrencyManager()
    public static instance() { return this._instance; }

    private readonly _map = new Map<string, Currency>()
    private _persistence: CurrencyPersistence = new LocalCurrencyPersistence('__currencies/default')
    private _init = false

    public isReady(): boolean {
        return this._persistence.isReady()
    }

    public async onReady() {
        await this._persistence.onReady()
    }

    public initialize(persistence?: CurrencyPersistence) {
        this._init = true
        this._persistence = persistence || this._persistence
    }

    public register(spec: CurrencySpec): Currency {
        if (!this._init) {
            console.error(`CurrencyManager not initialized. Consider calling initialize.`)
        }
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

    public async save(currency: Currency) {
        await this._persistence.save(currency.key, currency.serialize())
    }

    public clear() {
        this._map.forEach(value => {
            value.reset()
        })
    }

    private async load(currency: Currency) {
        const loaded = await this._persistence.load(currency.key)
        if (loaded) {
            currency.initialize(loaded)
        }
    }
}
