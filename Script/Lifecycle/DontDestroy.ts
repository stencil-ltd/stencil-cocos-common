import menu = cc._decorator.menu;

const {ccclass} = cc._decorator;

@ccclass
@menu("Stencil/Lifecycle/DontDestroy")
export default class DontDestroy extends cc.Component {

    protected onLoad(): void {
        cc.game.addPersistRootNode(this.node)
    }
}
