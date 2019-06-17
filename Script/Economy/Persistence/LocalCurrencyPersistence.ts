import CurrencyPersistence from "./CurrencyPersistence";
import CurrencySave from "../CurrencySave";
import {sleepMs} from "../../Foundation/StencilJs";

export default class LocalCurrencyPersistence implements CurrencyPersistence {

    public readonly key: string
    constructor(key: string) {
        this.key = key;
    }

    isReady(): boolean {
        return true;
    }

    onReady(): Promise<any> {
        return
    }

    async load(key: string): Promise<CurrencySave> {
        const str = cc.sys.localStorage.getItem(`${this.key}/${key}`)
        await sleepMs(1000)
        return str && JSON.parse(str)
    }

    async save(key: string, save: CurrencySave): Promise<void> {
        await sleepMs(1000)
        cc.sys.localStorage.setItem(`${this.key}/${key}`, JSON.stringify(save))
    }

}