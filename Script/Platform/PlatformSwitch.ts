export default class PlatformSwitch<T> {

    private _android: T
    private _ios: T
    private _default: T

    public withAndroid(value: T): this {
        this._android = value
        return this
    }

    public withIos(value: T): this {
        this._ios = value
        return this
    }

    public withDefault(value: T): this {
        this._default = value
        return this
    }

    public value(): T {
        switch (cc.sys.platform) {
            case cc.sys.ANDROID:
                return this._android || this._default
            case cc.sys.IPHONE:
                return this._ios || this._default
            default: {
                return this._default
            }
        }
    }

}