import menu = cc._decorator.menu;
import property = cc._decorator.property;
import Rect = cc.Rect;
import requireComponent = cc._decorator.requireComponent;
import Widget = cc.Widget;
import Controller from "../Lifecycle/Controller";
import StencilPlatforms from "../Platform/StencilPlatforms";

const {ccclass} = cc._decorator;

@ccclass
@requireComponent(Widget)
@menu("Stencil/Ui/SafeArea")
export default class SafeArea extends Controller {

    public static instance(): SafeArea {
        return Controller.get(SafeArea)
    }

    /**
     * Thanks QuirksMode!
     * https://www.quirksmode.org/blog/archives/2017/10/safeareainset_v.html
     */
    private static webSafeArea(): Rect {
        let x = 0
        let y = 0
        let width = cc.view.getFrameSize().width
        let height = cc.view.getFrameSize().height
        if (CSS.supports('padding-left: constant(safe-area-inset-left)')) {
            const div = document.createElement('div')
            document.body.appendChild(div)
            div.style.paddingTop = 'constant(safe-area-inset-top)'
            div.style.paddingBottom = 'constant(safe-area-inset-bottom)'
            div.style.paddingLeft = 'constant(safe-area-inset-left)'
            div.style.paddingRight = 'constant(safe-area-inset-right)'
            const style = window.getComputedStyle(div)
            x = parseInt(style.paddingLeft)
            y = parseInt(style.paddingBottom)
            width = width - x - parseInt(style.paddingRight)
            height = height - y - parseInt(style.paddingTop)
            document.body.removeChild(div)
        }
        return new Rect(x, y, width, height)
    }

    @property()
    testNotch: boolean = false

    private fullArea(): Rect {
        const orig = cc.view.getViewportRect()
        const vWidth = this.node.parent.width
        const scale = vWidth / orig.width
        return new Rect(orig.x * scale, orig.y * scale, orig.width * scale, orig.height * scale)
    }

    private safeArea(): Rect {
        if (CC_PREVIEW && this.testNotch) {
            const vis = this.fullArea()
            return new Rect(0, 132, vis.width, vis.height - 132 - 102)
        }
        if (StencilPlatforms.isMobileBrowser()) {
            return SafeArea.webSafeArea()
        }
        return cc.sys.getSafeAreaRect()
    }

    protected onLoad(): void {
        super.onLoad()
        const widget = this.getComponent(Widget)
        const safe = this.safeArea()
        const vis = this.fullArea()
        const top = safe.yMin - vis.yMin
        const bot = vis.yMax - safe.yMax
        widget.top = top
        widget.bottom = bot
        console.log(`SafeArea: ${top} + ${bot} (${JSON.stringify(safe)} vs ${JSON.stringify(vis)})`)
    }
}
