import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;

@ccclass()
export default class LobStyle {

    public static readonly standard = new LobStyle()

    @property()
    duration: number = 0.4

    @property()
    elastic: boolean = true

    @property()
    elasticity: number = 0.5

}