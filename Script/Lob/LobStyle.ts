import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import {LobEasing} from "./LobEasing";

@ccclass("LobStyle")
export default class LobStyle {

    public static readonly standard = new LobStyle()

    @property()
    duration: number = 0.5

    @property({type: cc.Enum(LobEasing)})
    easing: LobEasing = LobEasing.InOut

    @property()
    easingFactor: number = 3

    applyToAction(action: cc.ActionInterval) {
        switch (this.easing) {
            case LobEasing.In:
                action.easing(cc.easeIn(this.easingFactor))
                break;
            case LobEasing.Out:
                action.easing(cc.easeOut(this.easingFactor))
                break;
            case LobEasing.InOut:
                action.easing(cc.easeInOut(this.easingFactor))
                break;
            case LobEasing.ElasticIn:
                action.easing(cc.easeBackIn())
                break;
            case LobEasing.ElasticOut:
                action.easing(cc.easeBackOut())
                break;
            case LobEasing.ElasticInOut:
                action.easing(cc.easeBackInOut())
                break;

        }
    }

}