import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import Prefab = cc.Prefab;

@ccclass("LobParticles")
export default class LobParticles {

    @property(Prefab)
    fromParticle: Prefab = null

    @property(Prefab)
    toParticle: Prefab = null

}