export default abstract class Singleton extends cc.Component {

    private static map = new Map<Function, Singleton>()
    public static get<T extends Singleton>(ctor: Function): T|null {
        return this.map.get(ctor) as T
    }

    protected onLoad(): void {
        if (Singleton.get(this.constructor)) {
            cc.log(`Singleton: existing instance of ${this.constructor.name}.`)
            this.node.destroy()
            return
        }
        cc.log(`Singleton: No existing instance of ${this.constructor.name}. Initializing.`)
        Singleton.map.set(this.constructor, this)
        cc.game.addPersistRootNode(this.node)
    }
}
