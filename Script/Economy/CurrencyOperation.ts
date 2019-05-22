import Currency from "./Currency";

export default class CurrencyOperation {

    public readonly currency: Currency
    public readonly success: boolean

    constructor(currency: Currency, success: boolean) {
        this.currency = currency;
        this.success = success;
    }

    public andSave(): boolean {
        if (!this.success) return false
        this.currency.save()
        return true
    }
}