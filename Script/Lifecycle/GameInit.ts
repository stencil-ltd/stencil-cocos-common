import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;

@ccclass()
export default abstract class GameInit extends cc.Component {

    @property()
    debugStats: boolean = false

    protected start(): void {
        if (!this.debugStats)
            cc.debug.setDisplayStats(false)
    }

}
