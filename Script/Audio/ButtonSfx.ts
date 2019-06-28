import menu = cc._decorator.menu;
import property = cc._decorator.property;
import AudioClip = cc.AudioClip;
import requireComponent = cc._decorator.requireComponent;
import Button = cc.Button;
import AudioSource = cc.AudioSource;

const {ccclass} = cc._decorator;

@ccclass
@requireComponent(Button)
@menu("Stencil/Audio/ButtonSfx")
export default class ButtonSfx extends cc.Component {

    @property({type: AudioClip})
    clip: AudioClip

    protected start() {
        this.node.on('click', this._onClick, this)
    }

    private _onClick() {
        if (this.clip) cc.audioEngine.playEffect(this.clip, false)
    }
}
