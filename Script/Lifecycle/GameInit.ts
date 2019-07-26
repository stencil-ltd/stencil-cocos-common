import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import {stencilLog} from "../Logs/StencilLog";

@ccclass()
export default abstract class GameInit extends cc.Component {

    @property()
    debugStats: boolean = false

    protected onLoad(): void {
        // Nothing
    }

    protected start(): void {
        stencilLog(`GameInit Start`)
        if (!this.debugStats) {
            stencilLog('Hiding Display Stats')
            cc.debug.setDisplayStats(false)
        }
    }

}
