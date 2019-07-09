export default class PromiseWrapper<T> {

    public readonly promise: Promise<T>

    private _value: T | PromiseLike<T> | null
    private _reason: any|null

    private _resolve: (value?: T | PromiseLike<T>) => void
    private _reject: (reason?: any) => void

    private _isResolved = false
    private _isRejected = false

    public get success(): boolean|null {
        if (this._isResolved) {
            return true
        }
        if (this._isRejected) {
            return false
        }
        return null
    }

    public get value(): T | PromiseLike<T> | null {
        return this._value
    }

    public get reason(): any | null {
        return this._reason
    }

    public isFinished() {
        return this._isResolved || this._isRejected
    }

    constructor() {
        this.promise = new Promise<T>((resolve, reject) => {
            this._resolve = resolve
            this._reject = reject
        })

        this.promise.then(value1 => {
            this._isResolved = true
        }).catch((e) => {
            this._isRejected = true
        })
    }

    public resolve(value?: T | PromiseLike<T>) {
        if (this.isFinished()) {
            throw `Already finished (${this._isResolved})`
        }
        this._value = value
        this._resolve(value)
    }

    public reject(reason?: any) {
        if (this.isFinished()) {
            throw `Already finished (${this._isResolved})`
        }
        this._reason = reason
        this._reject(reason)
    }
}