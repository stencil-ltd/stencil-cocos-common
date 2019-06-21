import ccclass = cc._decorator.ccclass;

@ccclass()
export default abstract class GameInit extends cc.Component {

    protected start(): void {
        cc.debug.setDisplayStats(false)
    }

}
