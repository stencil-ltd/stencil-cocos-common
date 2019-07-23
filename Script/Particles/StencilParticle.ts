import menu = cc._decorator.menu;
import requireComponent = cc._decorator.requireComponent;
import ParticleSystem = cc.ParticleSystem;
import property = cc._decorator.property;
import {ParticleFinish} from "./ParticleFinish";

const {ccclass} = cc._decorator;

@ccclass
@requireComponent(ParticleSystem)
@menu("Stencil/Particles/StencilParticle")
export default class StencilParticle extends cc.Component {

    @property({type: cc.Enum(ParticleFinish)})
    finish: ParticleFinish = ParticleFinish.Destroy

    private _particles: ParticleSystem

    protected onLoad(): void {
        this._particles = this.getComponent(ParticleSystem)
    }

    protected start() {

    }
}
