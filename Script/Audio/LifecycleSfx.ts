import menu = cc._decorator.menu;
import property = cc._decorator.property;
import AudioClip = cc.AudioClip;

const {ccclass} = cc._decorator;

@ccclass
@menu("Stencil/Audio/LifecycleSfx")
export default class LifecycleSfx extends cc.Component {

    @property({type: AudioClip})
    clip: AudioClip

    @property()
    playOnEnable: boolean = true

    @property()
    playOnStart: boolean = false

    protected start(): void {
        if (this.playOnStart) this.play()
    }

    protected onEnable(): void {
        if (this.playOnEnable) this.play()
    }

    private play() {
        if (!this.clip) return
        cc.audioEngine.playEffect(this.clip, false)
    }
}
