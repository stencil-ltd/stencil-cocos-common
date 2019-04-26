import menu = cc._decorator.menu;
import requireComponent = cc._decorator.requireComponent;
import Animation = cc.Animation;

const {ccclass} = cc._decorator;

@ccclass
@requireComponent(Animation)
@menu("Stencil/Anim/RestartAnimation")
export default class RestartAnimation extends cc.Component {

    protected onEnable(): void {
        const anim = this.getComponent(Animation)
        anim.play((anim.currentClip || anim.defaultClip || anim.getClips()[0]).name, 0)
    }
}
