import menu = cc._decorator.menu;
import property = cc._decorator.property;
import Vec2 = cc.Vec2;

const {ccclass} = cc._decorator;

@ccclass
@menu("Stencil/Physics/Follow")
export default class Follow extends cc.Component {

    @property(cc.Node)
    public followerOrSelf: cc.Node|null = null

    @property(cc.Node)
    public target: cc.Node = null

    private _lastPos: Vec2 = null

    protected onLoad(): void {
        this.followerOrSelf = this.followerOrSelf || this.node
    }

    protected start(): void {
        this._lastPos = this.target.position
    }

    protected lateUpdate(): void {
        if (!this.target.isValid) return
        const pos = this.target.position
        const diff = pos.sub(this._lastPos)
        this.followerOrSelf.position = this.followerOrSelf.position.add(diff)
        this._lastPos = pos
    }

}
