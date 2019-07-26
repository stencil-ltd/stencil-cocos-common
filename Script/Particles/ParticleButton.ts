import menu = cc._decorator.menu;
import requireComponent = cc._decorator.requireComponent;
import Button = cc.Button;
import property = cc._decorator.property;
import Prefab = cc.Prefab;

const {ccclass} = cc._decorator;

@ccclass
@requireComponent(Button)
@menu("Stencil/Particles/ParticleButton")
export default class ParticleButton extends cc.Component {

    @property(Prefab)
    prefab: Prefab

    protected start() {
        this.getComponent(Button).node.on('click', this._onClick, this)
    }

    private _onClick() {
        const obj = cc.instantiate(this.prefab)
        obj.setParent(this.node.parent)
        obj.setPosition(this.node.position)
    }
}
