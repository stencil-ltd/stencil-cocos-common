import menu = cc._decorator.menu;
import property = cc._decorator.property;
import Size = cc.Size;
import Widget = cc.Widget;
import requireComponent = cc._decorator.requireComponent;
import Canvas = cc.Canvas;
import {sleepMs} from "../../Foundation/StencilJs";

const {ccclass} = cc._decorator;

@ccclass
@requireComponent(Canvas)
@menu("Stencil/Ui/AspectEnforcer")
export default class AspectEnforcer extends cc.Component {

    @property(Size)
    max: Size = new Size(10.0, 16.0)

    private _canvas: Canvas
    private _updated = false

    protected onLoad(): void {
        this._canvas = this.getComponent(Canvas)
    }

    protected onEnable(): void {
        if (this._updated) return
        const ratio = this.node.width / this.node.height
        if (this.max) {
            const maxRatio = this.max.width / this.max.height
            if (ratio > maxRatio) {
                this._canvas.fitWidth = false
                this._canvas.fitHeight = true
                this._onUpdate()
                // this._canvas.designResolution.width *= (maxRatio / ratio)
            }
        }
    }

    private async _onUpdate() {
        this._updated = true
        // this.node.active = false
        // await sleepMs(1)
        // this.node.active = true
        // this._widget.updateAlignment()
        const widgets = this.getComponentsInChildren(Widget)
        widgets.forEach(value => {
            value.updateAlignment()
        })
    }
}
