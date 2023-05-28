import {
    _decorator,
    Component,
    Node,
    Collider2D,
    BoxCollider2D,
    Contact2DType,
    resources,
    instantiate,
    v2,
    Prefab,
    RigidBody2D
} from 'cc';
import {Player} from "db://assets/scripts/Player";

const {ccclass, property} = _decorator;

@ccclass('FlowerController')
export class FlowerController extends Component {
    alltime = 0;
    lastgen = -1;

    start() {
        this.node.getComponent(BoxCollider2D).on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    update(deltaTime: number) {
        this.alltime += deltaTime;

        const show = Math.floor((this.alltime * 10) % 2);
        for (let i = 0; i <= 1; i++) {
            this.node.getChildByName(`flower_${i}`).active = false
        }
        this.node.getChildByName(`flower_${show}`).active = true
        const rnd = Math.random();
        // possible to generate a bullet every 3 seconds
        if (rnd < 0.5 && this.alltime - this.lastgen > 3) {
            this.lastgen = this.alltime;
            resources.load("prefabs/Bullet", Prefab, (err, prefab) => {
                const bullet = instantiate(prefab);
                bullet.parent = this.node.parent;
                bullet.setPosition(this.node.position.x - 0.5, this.node.position.y + 0.5)

                // choose from -3 to 3
                const x = (
                    Math.random() < 0.5 ? 1 : -1
                ) * Math.random() * 5;

                bullet.getComponent(RigidBody2D).linearVelocity = v2(x, 10);
            })
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: any) {
        if (otherCollider.node.name == "Mario") {
            if (contact.getWorldManifold().normal.y === 1) {
                otherCollider.node.getComponent(Player).score += 300;
                setTimeout(() => {
                    this.node?.destroy();
                    this?.destroy();
                }, 100);
            } else {
                otherCollider.node.getComponent(Player).damage();
            }
        }
    }
}

