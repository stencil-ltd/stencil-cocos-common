import {stencilLog} from "../Logs/StencilLog";

export default abstract class Singleton extends cc.Component {

    private static map = new Map<Function, Singleton>()
    public static get<T extends Singleton>(ctor: Function): T|null {
        return this.map.get(ctor) as T
    }

    protected loaded: boolean

    protected onLoad(): void {
        if (Singleton.get(this.constructor)) {
            stencilLog(`Singleton: existing instance of ${this.constructor.name}.`)
            this.node.destroy()
            return
        }
        stencilLog(`Singleton: No existing instance of ${this.constructor.name}. Initializing.`)
        Singleton.map.set(this.constructor, this)
        cc.game.addPersistRootNode(this.node)
        this.loaded = true
        stencilLog(`Singleton: Loading ${this.constructor.name}`)
        this.onSingletonLoad()
    }

    protected onSingletonLoad() {}
}
