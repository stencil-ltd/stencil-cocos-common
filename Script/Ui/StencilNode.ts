import Component = cc.Component;
import Node = cc.Node;

export default class StencilNode {

    public static getComponentInParents<T extends Component>(node: Node, type: {prototype: T}): T|null {
        while (node != null) {
            const comp = node.getComponent(type)
            if (comp) return comp
            node = node.parent
        }
        return null
    }

}