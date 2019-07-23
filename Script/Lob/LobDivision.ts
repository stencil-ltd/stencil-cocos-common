import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;

@ccclass("LobDivision")
export default class LobDivision {

    @property()
    concreteAmount: boolean = false

    @property()
    amountPerLob: number = 0.1

    @property()
    interval: number = 0.1

}