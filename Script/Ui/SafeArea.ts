import menu = cc._decorator.menu;
import property = cc._decorator.property;
import Rect = cc.Rect;
import requireComponent = cc._decorator.requireComponent;
import Widget = cc.Widget;
import Controller from "../Lifecycle/Controller";

const {ccclass} = cc._decorator;

@ccclass
@requireComponent(Widget)
@menu("Stencil/Ui/SafeArea")
export default class SafeArea extends Controller {
    public static instance(): SafeArea {
        return Controller.get(SafeArea)
    }

    @property()
    testNotch: boolean = false

    private fixed = false

    private fullArea(): Rect {
        const orig = cc.view.getViewportRect()
        const scale = 1080 / orig.width
        return new Rect(orig.x * scale, orig.y * scale, orig.width * scale, orig.height * scale)
    }

    private safeArea(): Rect {
        if (CC_PREVIEW && this.testNotch) {
            const vis = this.fullArea()
            return new Rect(0, 132, vis.width, vis.height - 132 - 102)
        }
        return cc.sys.getSafeAreaRect()
    }

    protected update(dt: number): void {
        if (!this.fixed) {
            this.fixed = true
            const widget = this.getComponent(Widget)
            const safe = this.safeArea()
            const vis = this.fullArea()
            const top = safe.yMin - vis.yMin
            const bot = vis.yMax - safe.yMax
            widget.top = top
            widget.bottom = bot
            console.log(`SafeArea: ${top} + ${bot} (${JSON.stringify(safe)} vs ${JSON.stringify(vis)})`)
            this.getComponentsInChildren(Widget).forEach(value => value.updateAlignment())
        }
    }
}
