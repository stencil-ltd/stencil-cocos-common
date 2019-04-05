export interface Subscribeable<T> {
    subscribe(owner: any, fn: (T) => void)
    unsubscribe(owner: any)
}