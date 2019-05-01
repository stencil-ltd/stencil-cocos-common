import Texture2D = cc.Texture2D;
import PromiseLoading from "./PromiseLoading";
import {makeRequest} from "../Waiting/StencilWaiting";

export default class LoadingCache {

    public static readonly instance: LoadingCache = new LoadingCache()

    private readonly _root: string

    constructor(root?: string) {
        this._root = root || 'default'
    }

    private getLocal(url: string): string {
        const hash = url.hashCode()
        return `${jsb.fileUtils.getWritablePath()}stencil/cache/${this._root}/${hash}`
    }

    public async loadImage(url: string): Promise<Texture2D> {
        const file = this.getLocal(url)
        console.log(`LoadingCache: loadImage(${url}) => ${file}`)
        if (!jsb.fileUtils.isFileExist(file)) {
            const data = await makeRequest('GET', url)
            console.log(`LoadingCache: Found bytes for ${url}`)
            jsb.fileUtils.writeDataToFile(data, file)
        }
        return await PromiseLoading.loadSingle(file)
    }
}