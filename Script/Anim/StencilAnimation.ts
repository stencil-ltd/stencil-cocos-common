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
    delayVisible: boolean = false

    @property()
    sampleOnEnable: boolean = true

    @property()
    sampleOnUpdate: boolean = true

    private _anim: cc.Animation

    protected onLoad(): void {
        this._anim = this.getComponent(cc.Animation)
    }

    protected onEnable(): void {
        const clip = this.getClip();
        if (this.restartOnAwake) {
            this._anim.play(clip.name, 0)
        }
        if (this.sampleOnEnable) {
            this.sample()
        }
        if (this.delayVisible) {
            const opacity = this.node.opacity
            this.node.opacity = 0
            this.scheduleOnce(() => this.node.opacity = opacity, 0.1)
        }
    }

    protected update(dt: number): void {
        if (this.sampleOnUpdate) this.sample()
    }

    private getClip() {
        const anim = this._anim
        return (anim.currentClip || anim.defaultClip || anim.getClips()[0])
    }

    private sample() {
        this._anim.sample(this.getClip().name)
    }
}
