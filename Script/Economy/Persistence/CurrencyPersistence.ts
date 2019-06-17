import CurrencySave from "../CurrencySave";

export default interface CurrencyPersistence {
    onReady(): Promise<any>
    isReady(): boolean
    save(key: string, save: CurrencySave): Promise<void>
    load(key: string): Promise<CurrencySave>
}