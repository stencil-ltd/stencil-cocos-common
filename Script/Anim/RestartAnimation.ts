import menu = cc._decorator.menu;
import requireComponent = cc._decorator.requireComponent;
import Animation = cc.Animation;
import property = cc._decorator.property;
import obsolete = cc.js.obsolete;

const {ccclass} = cc._decorator;

@ccclass
@requireComponent(Animation)
// Deprecated. Use StencilAnimation instead.
// @menu("Stencil/Anim/RestartAnimation")
export default class RestartAnimation extends cc.Component {

    protected onEnable(): void {
        const anim = this.getComponent(Animation)
        anim.play((anim.currentClip || anim.defaultClip || anim.getClips()[0]).name, 0)
    }
}
