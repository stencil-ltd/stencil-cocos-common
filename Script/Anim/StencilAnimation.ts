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

    @property()
    deactivateOnFinish: boolean = false

    private _anim: cc.Animation

    protected onLoad(): void {
        this._anim = this.getComponent(cc.Animation)
    }

    protected async onEnable() {
        const clip = this.getClip()
        if (!clip) return
        if (this.restartOnAwake) {
            const state = this._anim.play(clip.name, 0)
            if (this.deactivateOnFinish) {
                await state.wait()
                this.node.active = false
            }
        }
    }

    private getClip() {
        const anim = this._anim
        return (anim.currentClip || anim.defaultClip || anim.getClips()[0])
    }
}
