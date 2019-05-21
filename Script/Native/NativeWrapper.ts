import PlatformSwitch from "../Platform/PlatformSwitch";
import StencilPlatforms from "../Platform/StencilPlatforms";
import StencilNative from "./StencilNative";

export default class NativeWrapper {

    public static withClasses(ios: string, android: string) {
        return new NativeWrapper(new PlatformSwitch<string>().withIos(ios).withAndroid(android))
    }

    public readonly className: PlatformSwitch<string>

    constructor(className: PlatformSwitch<string>) {
        this.className = className;
    }

    public method(name: string): NativeMethod {
        return new NativeMethod(this.className.value(), name)
    }
}

export class NativeMethod {

    public readonly klass: string
    public readonly name: string

    private _args: NativeArg[] = []
    private _returns: NativeType = NativeType.Void

    constructor(klass: string, name: string) {
        this.klass = klass;
        this.name = name;
    }

    public addArg(name: string, type: NativeType): this {
        this._args.push({
            name: name,
            type: type
        })
        return this
    }

    public returns(type: NativeType): this {
        this._returns = type
        return this
    }

    public _androidSignature(): string {
        const params = this._args.map(value => value.type.toString()).join(';')
        return `(${params})${this._returns.toString()}`
    }

    public _androidClass(): string {
        return this.klass.replace(new RegExp('\\.', 'g'), '/');
    }

    public _iosName(): string {
        let name = this.name // foo
        if (this._args.length > 0) {
            const arg = this._args[0].name
            name += "With"
            name += arg.charAt(0).toUpperCase() + arg.slice(1)
            name += ":"
        }
        for (let i = 1; i < this._args.length; ++i) {
            name += this._args[i].name
            name += ":"
        }
        return name
    }

    public execute(...args: any[]): any {
        if (StencilPlatforms.isAndroid()) {
            return StencilNative.callJava(this._androidClass(), this.name, this._androidSignature(), ...args)
        }
        if (StencilPlatforms.isIos()) {
            return StencilNative.callIos(this.klass, this._iosName(), ...args)
        }
    }
}

export enum NativeType {
    Void = "V",
    Boolean = "Z",
    String = "Ljava/lang/String"
}

export interface NativeArg {
    name: string,
    type: NativeType
}