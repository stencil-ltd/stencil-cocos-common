import menu = cc._decorator.menu;
import property = cc._decorator.property;

const {ccclass} = cc._decorator;

@ccclass
@menu("Stencil/Ui/TabletScale")
export default class TabletScale extends cc.Component {

    @property()
    aspectThreshold = 0.6

    @property()
    x: number = 1.0

    @property()
    y: number = 1.0

    protected onLoad(): void {
        if (this.isTablet()) {
            console.log(`Setting ${this.node.name} scale to (${this.x}, ${this.y})`)
            this.node.scaleX *= this.x
            this.node.scaleY *= this.y
        }
    }

    public isTablet(): boolean {
        const size = cc.director.getWinSize()
        const ratio = size.width / size.height
        return ratio >= this.aspectThreshold
    }
}
