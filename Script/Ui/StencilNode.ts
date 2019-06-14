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

    public static changeParent(node: Node, newParent: Node) {
        if(node.parent == newParent) return;
        const getWorldRotation = function (node) {
            let currNode = node;
            let resultRot = currNode.rotation;
            do {
                currNode = currNode.parent;
                resultRot += currNode.rotation;
            } while (currNode.parent != null);
            resultRot = resultRot % 360;
            return resultRot;
        };

        const oldWorRot = getWorldRotation(node);
        const newParentWorRot = getWorldRotation(newParent);
        const newLocRot = oldWorRot - newParentWorRot;

        const oldWorPos = node.convertToWorldSpaceAR(cc.p(0, 0));
        const newLocPos = newParent.convertToNodeSpaceAR(oldWorPos);

        node.parent = newParent;
        node.position = newLocPos;
        node.rotation = newLocRot;
    }

}