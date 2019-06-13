import menu = cc._decorator.menu;

const {ccclass} = cc._decorator;

@ccclass
@menu("Stencil/Dev/DevOnly")
export default class DevOnly extends cc.Component {

    protected start() {
        if (!CC_DEBUG) this.node.active = false
    }
}
