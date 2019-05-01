import Texture2D = cc.Texture2D;
import PromiseLoading from "./PromiseLoading";

export default class LoadingCache {

    public static readonly instance: LoadingCache = new LoadingCache()

    private _storage: StencilStorage

    private readonly _root: string

    constructor(root?: string) {
        this._root = root || 'default'
        this._storage = new StencilStorage(root)
    }

    private getLocal(url: string): string {
        return `${jsb.fileUtils.getWritablePath()}/stencil/cache/${this._root}/${escape(url)}`
    }

    private getBytes(tex: Texture2D): string {
        // @ts-ignore
        return tex.getHtmlElementObj().toDataURL()
    }

    public async loadImage(url: string): Promise<Texture2D> {
        const file = this.getLocal(url)
        try {
            return await PromiseLoading.loadSingle(file)
        } catch (e) {
            const retval = await PromiseLoading.loadSingle(url) as Texture2D
            const bytes = this.getBytes(retval)
            console.log(`Found bytes ${bytes} for image`)
            jsb.fileUtils.writeDataToFile(bytes, file)
            return retval
        }
    }
}