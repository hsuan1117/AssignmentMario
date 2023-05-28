import {_decorator, Component, Node, BoxCollider2D, v2, Size, RigidBody2D, Contact2DType} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('WallController')
export class WallController extends Component {
    @property
    public mario = false

    start() {

    }

    onLoad() {
        const collider = this.node.getComponent(BoxCollider2D)
        collider.friction = 0
        collider.enabled = true
        if (collider) {
            if(this.mario) {
                collider.offset.y = collider.offset.y + 30
                collider.size.height = 120
            }
            collider.on(Contact2DType.BEGIN_CONTACT, (self, other, contact) => {
                if (other.tag !== 3 && !this.mario) {
                    contact.disabled = true
                } else {
                    collider.restitution = 300
                    other.node.getComponent(RigidBody2D).linearVelocity = v2(-other.node.getComponent(RigidBody2D).linearVelocity.x, 0)
                }
            }, this);
        }
    }

    update(deltaTime: number) {

    }
}

