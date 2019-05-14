import menu = cc._decorator.menu;
import requireComponent = cc._decorator.requireComponent;
import property = cc._decorator.property;

const {ccclass} = cc._decorator;

@ccclass
@requireComponent(cc.Animation)
@menu("Stencil/Anim/StencilAnimation")
export default class StencilAnimation extends cc.Component {

    @property()
    restartOnAwake: boolean = true

    private _anim: cc.Animation

    protected onLoad(): void {
    }

    protected onEnable(): void {
        const clip = this.getClip();
        if (this.restartOnAwake) {
            this._anim.play(clip.name, 0)
        }
    }

    private getClip() {
        const anim = this._anim
        return (anim.currentClip || anim.defaultClip || anim.getClips()[0])
    }
}
