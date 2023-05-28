import {_decorator, Component, Node, Collider2D, Contact2DType, resources, AudioClip} from 'cc';
import {Player} from "db://assets/scripts/Player";

const {ccclass, property} = _decorator;

@ccclass('BulletController')
export class BulletController extends Component {
    start() {
        this.node.getComponent(Collider2D)?.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    update(deltaTime: number) {

    }


    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: any) {
        if (otherCollider.tag === 1) {
            setTimeout(() => {
                this.node?.destroy();
                this?.destroy();
            }, 100);
        }
        if (otherCollider.node.name == "Mario") {
            resources.load("audio/explosion", AudioClip, (err, audio) => {
                audio.play()
            })
            otherCollider.node.getComponent(Player).damage();
        }
    }
}

