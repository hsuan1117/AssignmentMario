import {_decorator, Component, Node, BoxCollider2D, Contact2DType, RigidBody2D, v2, director} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('FinishController')
export class FinishController extends Component {

    onLoad() {
        const collider = this.node.getComponent(BoxCollider2D)
        collider.restitution = 0
        collider.friction = 0
        collider.enabled = true
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, (self, other, contact) => {
                if (other.node.name == "Mario")
                    director.loadScene('WinScene')
            }, this);
        }
    }
}

