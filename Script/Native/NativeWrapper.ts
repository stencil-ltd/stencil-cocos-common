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

    public call(name: string): NativeCall {
        return new NativeCall(this.className.value(), name)
    }
}

export class NativeCall {

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

    public execute(...args: any[]): any {
        if (StencilPlatforms.isAndroid()) {
            const params = this._args.map(value => value.type.toString()).join(';')
            const sig = `(${params})${this._returns.toString()}`
            return StencilNative.callJava(this.klass.replace('.','/'), this.name, sig, ...args)
        }

        if (StencilPlatforms.isIos()) {
            let name = this.name // foo
            if (this._args.length > 0) {
                const arg = this._args[0].name
                name += "With"
                name += arg.charAt(0) + arg.slice(1)
                name += ":"
            }
            for (let i = 1; i < this._args.length; ++i) {
                name += this._args[i]
                name += ":"
            }
            return StencilNative.callIos(this.klass, name, ...args)
        }
    }
}

export enum NativeType {
    Void = "V",
    Boolean = "Z",
    String = "Ljava/lang/String;"
}

export interface NativeArg {
    name: string,
    type: NativeType
}