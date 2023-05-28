import {
    _decorator,
    Component,
    Collider2D,
    Contact2DType,
    BoxCollider2D, RigidBody2D,
    instantiate, v2,
    resources, AudioClip,
    Prefab,
    Node
} from 'cc';
import {Player} from "db://assets/scripts/Player";

const {ccclass, property} = _decorator;

@ccclass('MushroomController')
export class MushroomController extends Component {
    alltime = 0;

    start() {
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    update(deltaTime: number) {
        this.alltime += deltaTime;
        if (Math.abs(this.node.getComponent(RigidBody2D).linearVelocity.x) < 2) {
            if (this.node.getComponent(RigidBody2D).linearVelocity.x < 0) {
                this.node.getComponent(RigidBody2D).linearVelocity = v2(-4, 0)
            } else {
                this.node.getComponent(RigidBody2D).linearVelocity = v2(4, 0)
            }
        }

        const show = Math.floor((this.alltime * 10) % 4);
        for (let i = 0; i <= 4; i++) {
            this.node.getChildByName(`Goomba_${i}`).active = false
        }
        this.node.getChildByName(`Goomba_${show}`).active = true
    }


    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: any) {
        if (otherCollider.node.name == "Mario") {
            if (contact.getWorldManifold().normal.y === 1) {
                otherCollider.node.getComponent(Player).score += 100;
                resources.load("audio/kick", AudioClip, (err, audio) => {
                    audio.play()
                });
                setTimeout(() => {
                    this.node?.destroy();
                    this?.destroy();
                }, 100);
            }
        }

    }
}

