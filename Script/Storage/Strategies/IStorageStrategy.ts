export default interface IStorageStrategy {

    remove(key: string)
    clear()
    getString(key: string): string|null
    setString(key: string, value: string)
    getInt(key: string, def: number): number
    setInt(key: string, value: number)

}