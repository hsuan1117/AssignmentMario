import {
    _decorator,
    Component,
    Collider2D,
    Contact2DType,
    BoxCollider2D,RigidBody2D,
    instantiate,v2,
    resources,AudioClip,
    Prefab,
    Node
} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('MushroomController')
export class MushroomController extends Component {
    start() {
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    update(deltaTime: number) {
        if(Math.abs(this.node.getComponent(RigidBody2D).linearVelocity.x) < 2) {
            if(this.node.getComponent(RigidBody2D).linearVelocity.x < 0) {
                this.node.getComponent(RigidBody2D).linearVelocity = v2(-4, 0)
            } else {
                this.node.getComponent(RigidBody2D).linearVelocity = v2(4, 0)
            }
        }
    }


    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: any) {
        if (otherCollider.node.name == "Mario") {
            console.log(contact.getWorldManifold().normal.y)
            resources.load("audio/kick", AudioClip, (err, audio) => {
                audio.play()
            });
            if (contact.getWorldManifold().normal.y === 1) {
                setTimeout(()=> {
                    this.node.destroy();
                    this.destroy();
                }, 100);
            }
        }

    }
}

