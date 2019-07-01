import menu = cc._decorator.menu;
import requireComponent = cc._decorator.requireComponent;
import Button = cc.Button;
import property = cc._decorator.property;

const {ccclass} = cc._decorator;

@ccclass
@requireComponent(Button)
@menu("Stencil/Ui/SceneButton")
export default class SceneButton extends cc.Component {

    @property()
    scene: string = ''

    protected start() {
        this.node.on('click', () => cc.director.loadScene(this.scene))
    }
}
