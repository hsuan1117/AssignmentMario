import {
    _decorator,
    Component,
    Node,
    systemEvent,
    SystemEventType,
    Contact2DType,
    PhysicsSystem2D,
    EventKeyboard,
    Collider2D,
    RigidBody2D,
    v2,
    KeyCode
} from 'cc';

const {ccclass, property} = _decorator;

enum MoveDirection {
    none,
    left,
    right,
    jump,
}

@ccclass('Player')
export class Player extends Component {
    @property
    moveDirection: MoveDirection = MoveDirection.none;

    @property
    playerSpeed: number = 300;

    @property
    onGround: boolean = false;

    onLoad() {
        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.on(SystemEventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy() {
        systemEvent.off(SystemEventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.off(SystemEventType.KEY_UP, this.onKeyUp, this);
    }

    start() {
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }

        // Registering global contact callback functions
        if (PhysicsSystem2D.instance) {
            PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            PhysicsSystem2D.instance.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
    }

    update(deltaTime: number) {
        // scaleX
        this.movePlayer(deltaTime);
    }

    movePlayer(dt) {
        switch (this.moveDirection) {
            case MoveDirection.left:
                this.node.setPosition(this.node.position.x - this.playerSpeed * dt, this.node.position.y)
                break;
            case MoveDirection.right:
                this.node.setPosition(this.node.position.x + this.playerSpeed * dt, this.node.position.y)
                break;
        }
    }

    jump() {
        //if (this.moveDirection != MoveDirection.jump || !this.onGround) return;
        this.node.getComponent(RigidBody2D).linearVelocity = v2(0, 15)
    }

    onKeyDown(e) {
        switch (e.keyCode) {
            case KeyCode.KEY_D:
                this.moveDirection = MoveDirection.right;
                break;
            case KeyCode.KEY_A:
                this.moveDirection = MoveDirection.left;
                break;
            case KeyCode.KEY_W:
            case KeyCode.SPACE:
                this.moveDirection = MoveDirection.jump;
                this.jump()
                break;
        }
    }

    onKeyUp(e) {
        this.moveDirection = MoveDirection.none;
    }

    onBeginContact(contact, self, other) {
        if (other?.tag === 1) {
            this.onGround = true;
        }
    }

    onEndContact(contact, self, other) {
        if (other?.tag === 1) {
            // this.onGround = false;
        }
    }
}

