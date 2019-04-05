import {DataSource} from "./DataSource";

export default class DataSources {

    public static readonly instance: DataSources = new DataSources()

    private lookup = new Map<string, DataSource<any>>()

    public register(source: DataSource<any>) {
        const key = source.key.toLowerCase()
        if (this.lookup.has(key)) {
            console.log(`skipping DataSource ${key}: already exists`)
            return
        }
        this.lookup.set(key, source)
        console.log(`register DataSource ${key} [${this.lookup.size} total]`)
    }

    public unregister(key: string) {
        this.lookup.delete(key)
    }

    public get<T>(key: string): DataSource<T> {
        key = key.toLowerCase()
        return this.lookup.get(key) as DataSource<T>
    }
}
