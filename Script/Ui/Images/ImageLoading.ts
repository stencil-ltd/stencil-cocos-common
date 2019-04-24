import Sprite = cc.Sprite;
import Texture2D = cc.Texture2D;
import RetryLoader from "../../../../Script/Data/RetryLoader";

export default class ImageLoading {

    public static async setUrl(sprite: Sprite, url: string): Promise<Texture2D> {
        if (!sprite) return null
        const loader = new RetryLoader(url)
        sprite.enabled = false
        try {
            const start = Date.now()
            const tex = await loader.load() as Texture2D
            const stop = Date.now()
            sprite.spriteFrame.setTexture(tex)
            sprite.node.opacity = 0
            sprite.enabled = true
            console.log(`load time (${stop - start}) for ${url}`)
            if (stop - start <= 50) { // 16ms = less than a frame
                sprite.node.opacity = 255
            } else {
                sprite.node.runAction(cc.fadeIn(0.5))
            }
            return tex
        } catch (e) {
            console.error(e)
        }
    }
}