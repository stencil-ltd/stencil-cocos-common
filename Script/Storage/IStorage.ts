export default interface IStorage {
    remove(key: string)
    getString(key: string): string|null
    setString(key: string, value: string)
    getInt(key: string, def: number): number
    setInt(key: string, value: number)
    getDate(key: string): Date|null
    setDate(key: string, value: Date)
}