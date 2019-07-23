import LobStyle from "./LobStyle";
import Node = cc.Node;
import {uuid} from "../Foundation/StencilJs";

export default class Lob {

    readonly id: string
    readonly amount: number
    readonly style: LobStyle
    readonly object: Node
    readonly data: object|null

    constructor(object: cc.Node, amount: number, style: LobStyle = null, data: object | null = null) {
        this.id = uuid()
        this.amount = amount;
        this.style = style || LobStyle.standard
        this.object = object;
        this.data = data;
    }
}