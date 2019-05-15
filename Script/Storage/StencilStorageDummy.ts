import IStorage from "./IStorage";

export default class StencilStorageDummy implements IStorage {

    private _map = {}

    getDate(key: string): Date | null {
        return
        return undefined;
    }

    getInt(key: string, def: number): number {
        return 0;
    }

    getString(key: string): string | null {
        return undefined;
    }

    remove(key: string) {
    }

    setDate(key: string, value: Date) {
    }

    setInt(key: string, value: number) {
    }

    setString(key: string, value: string) {
    }



}