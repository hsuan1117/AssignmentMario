import {
    _decorator,
    Component,
    Collider2D,
    RigidBody2D,
    Contact2DType,
    BoxCollider2D,
    instantiate,
    resources,
    ERigidBody2DType,
    AudioClip,
    Prefab,
    CircleCollider2D,
    Node,
    v2
} from 'cc';
import {Player} from "db://assets/scripts/Player";

const {ccclass, property} = _decorator;

@ccclass('QuestionBlockController')
export class QuestionBlockController extends Component {
    start() {
        // register begin contact callback
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
            collider.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
            collider.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
        }
    }

    update(deltaTime: number) {

    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: any) {
        if (otherCollider.node.name == "Mario") {
            if (contact.getWorldManifold().normal.y < 0) {
                // choose mushroom or coin
                const random = Math.random()
                if (random < 0.5) {
                    resources.load("prefabs/Mushroom", Prefab, (err, prefab) => {
                        const goomba = instantiate(prefab)
                        goomba.setPosition(selfCollider.node.position.x + 4, selfCollider.node.position.y + 16, 0)
                        otherCollider.node.parent.addChild(goomba)
                    });
                } else {
                    resources.load("prefabs/Coin", Prefab, (err, prefab) => {
                        const coin = instantiate(prefab)
                        coin.setPosition(selfCollider.node.position.x + 4, selfCollider.node.position.y + 16, 0)
                        coin.getComponent(BoxCollider2D).tag = 4
                        coin.getComponent(RigidBody2D).linearVelocity = v2(2, 10)
                        coin.getComponent(RigidBody2D).gravityScale = 2
                        coin.getComponent(RigidBody2D).type = ERigidBody2DType.Dynamic
                        coin.getComponent(BoxCollider2D).on(Contact2DType.BEGIN_CONTACT, (self, other, contact) => {
                            if (other.node.name == "MarioMap") {
                                otherCollider.node.getComponent(Player).coin++
                                setTimeout(()=>{
                                    coin.getComponent(BoxCollider2D).enabled = false
                                }, 100)
                                resources.load('audio/coin', AudioClip, (err, audio) => {
                                    audio.play();
                                })
                            }
                        })
                        otherCollider.node.parent.addChild(coin)
                    })
                }
            }
        }
    }

    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: any) {

    }

    onPreSolve(selfCollider: Collider2D, otherCollider: Collider2D, contact: any) {

    }

    onPostSolve(selfCollider: Collider2D, otherCollider: Collider2D, contact: any) {

    }
}

