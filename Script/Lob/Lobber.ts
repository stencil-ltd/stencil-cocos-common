import menu = cc._decorator.menu;
import property = cc._decorator.property;
import Prefab = cc.Prefab;
import Node = cc.Node;
import LobParticles from "./LobParticles";
import LobStyle from "./LobStyle";
import LobDivision from "./LobDivision";
import LobOverrides from "./LobOverrides";
import Lob from "./Lob";
import {sleepSeconds} from "../Foundation/StencilJs";

const {ccclass} = cc._decorator;

@ccclass
@menu("Stencil/Lobbers/Lobber")
export default class Lobber extends cc.Component {

    public static activeCount: number = 0

    @property(Prefab)
    prefab: Prefab = null

    @property(Node)
    from: Node = null

    @property(Node)
    to: Node = null

    @property(Node)
    lobParent: Node = null

    @property(LobParticles)
    particles: LobParticles = new LobParticles()

    @property(LobStyle)
    style: LobStyle = new LobStyle()

    @property(LobDivision)
    division: LobDivision = new LobDivision()

    async lobSingle(amount: number, overrides: LobOverrides = null) {
        let from = this.from
        let to = this.to
        if (overrides) {
            from = overrides.from || from
            to = overrides.to || to
        }
        const parent = this.lobParent || this.node

        const obj = cc.instantiate(this.prefab)
        obj.setParent(parent)
        obj.position = parent.convertToNodeSpaceAR(from.parent.convertToWorldSpaceAR(from.position))
        obj.active = true

        let style = this.style;
        if (overrides && overrides.style)
            style = overrides.style

        const lob = new Lob(obj, amount, style)
        this._begin(lob)
        await this._lob(lob, from, to)
        this._end(lob)
    }

    async lobMany(amount: number, overrides: LobOverrides = null) {
        const promises = []
        let remaining = amount
        let division = this.division;
        if (overrides && overrides.division)
            division = overrides.division
        while (remaining > 0) {
            let single: number
            if (division.concreteAmount) {
                single = division.amountPerLob
            } else {
                single = division.amountPerLob * amount
            }
            if (single < 0) break
            if (single < 1) single = 1
            if (single > remaining) single = remaining
            remaining -= single
            promises.push(this.lobSingle(single, overrides))
            if (remaining > 0) {
                const interval = division.interval
                await sleepSeconds(interval)
            }
        }
        await Promise.all(promises)
    }

    private async _lob(lob: Lob, from: cc.Node, to: cc.Node) {
        const parent = this.lobParent || this.node
        const position = parent.convertToNodeSpaceAR(to.parent.convertToWorldSpaceAR(to.position))
        const action = cc.moveTo(lob.style.duration, position)
        lob.style.applyToAction(action)
        await lob.object.runAction(action).wait()
    }

    private _begin(lob: Lob) {
        Lobber.activeCount++
        if (this.particles.fromParticle) {
            const part = cc.instantiate(this.particles.fromParticle)
            part.setParent(this.from.parent)
            part.setPosition(this.from.position)
        }
    }

    private _end(lob: Lob) {
        if (this.particles.toParticle) {
            const part = cc.instantiate(this.particles.toParticle)
            part.setParent(this.to.parent)
            part.setPosition(this.to.position)
        }
        lob.object.destroy()
        Lobber.activeCount--
    }
}
