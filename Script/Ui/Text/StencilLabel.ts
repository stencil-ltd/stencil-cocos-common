import menu = cc._decorator.menu;
import requireComponent = cc._decorator.requireComponent;
import Label = cc.Label;
import property = cc._decorator.property;
import {StencilFont} from "./StencilFont";
import StencilFonts from "./StencilFonts";
import executeInEditMode = cc._decorator.executeInEditMode;

const {ccclass} = cc._decorator;

@ccclass
@requireComponent(Label)
@executeInEditMode()
@menu("Stencil/Text/StencilLabel")
export default class StencilLabel extends cc.Component {

    @property({type: cc.Enum(StencilFont)})
    public font: StencilFont = StencilFont.Default

    private _label: Label = null

    protected onLoad(): void {
        this._label = this.getComponent(Label)
    }

    protected start() {
        this.refresh()
    }

    protected update(dt: number): void {
        if (CC_EDITOR) {
            this.refresh()
        }
    }

    private refresh() {
        const font = StencilFonts.instance().getFont(this.font)
        this._label.isSystemFontUsed = false
        this._label.font = font
        console.log(`[${this.node.name}]: Setting font to ${font.name}`)
    }
}
