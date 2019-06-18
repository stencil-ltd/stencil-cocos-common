import menu = cc._decorator.menu;
import property = cc._decorator.property;
import requireComponent = cc._decorator.requireComponent;
import Button = cc.Button;

const {ccclass} = cc._decorator;

@ccclass
@requireComponent(Button)
@menu("Stencil/Ui/UrlButton")
export default class UrlButton extends cc.Component {

    @property()
    url: string = ''

    protected onLoad(): void {
        this.node.on('click', this._onClick, this)
    }

    private _onClick() {
        cc.sys.openURL(this.url)
    }
}
