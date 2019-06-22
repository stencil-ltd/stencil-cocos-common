import menu = cc._decorator.menu;
import Singleton from "../Lifecycle/Singleton";
import property = cc._decorator.property;
import AudioClip = cc.AudioClip;

const {ccclass} = cc._decorator;

@ccclass
@menu("Stencil/Audio/BackgroundMusic")
export default class BackgroundMusic extends Singleton {

    @property({type: AudioClip})
    music: AudioClip = null

    protected onSingletonLoad() {
        super.onSingletonLoad();
        cc.audioEngine.playMusic(this.music, true)
    }
}
