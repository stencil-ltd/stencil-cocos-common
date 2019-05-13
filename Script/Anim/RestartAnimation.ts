import menu = cc._decorator.menu;
import requireComponent = cc._decorator.requireComponent;
import Animation = cc.Animation;
import property = cc._decorator.property;

const {ccclass} = cc._decorator;

@ccclass
@requireComponent(Animation)
@menu("Stencil/Anim/RestartAnimation")
export default class RestartAnimation extends cc.Component {

    @property()
    fadeInHack: boolean = false

    protected onEnable(): void {
        const anim = this.getComponent(Animation)
        anim.play((anim.currentClip || anim.defaultClip || anim.getClips()[0]).name, 0)
        if (this.fadeInHack) {
            const opacity = this.node.opacity
            this.node.opacity = 0
            this.scheduleOnce(() => {
                this.node.opacity = opacity
            }, 0.1)
        }
    }
}
