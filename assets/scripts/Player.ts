import {
    _decorator,
    Component,
    Node,
    systemEvent,
    SystemEventType, director,
    Contact2DType,
    Collider2D,
    RigidBody2D,
    v2,
    KeyCode,
    Label, Prefab,
    instantiate,
    AudioClip,
    AudioSource,
    BoxCollider2D,
    resources,
    color
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
    jumpTime: number = 0;

    @property
    public score : number = 0;

    @property
    onGround: boolean = false;

    @property
    public life = 3;

    @property
    public coin = 0;

    alltime = 0

    onLoad() {
        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.on(SystemEventType.KEY_UP, this.onKeyUp, this);

        // create a label to show x,y
        // const nd = new Node()
        // nd.setPosition(0, 24)
        // const label = nd.addComponent(Label);
        // label.fontSize = 12;
        // label.color = color(0, 0, 0);
        // this.node.addChild(nd)
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
            collider.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
        }
    }

    damage() {
        this.life--;
        resources.load('audio/loseOneLife', AudioClip, (err, audio) => {
            this.node.getComponent(AudioSource).clip = audio;
            this.node.getComponent(AudioSource).play();
        })
    }

    playedGameOver = false;

    update(deltaTime: number) {
        this.alltime += deltaTime;
        // scaleX
        this.movePlayer(deltaTime);
        if (this.node.position.y < -320) {
            this.damage()
            this.node.setPosition(-280, -280);
        }

        // update x,y to the label
        // this.node.getComponentInChildren(Label).string = `x:${this.node.position.x.toFixed(2)}, y:${this.node.position.y.toFixed(2)}`;

        if (this.life <= 0) {
            director.loadScene('LoseScene')
        }
        for (let i = 0; i <= 44; i++) {
            this.node.getChildByName(`mario_big_${i}`).active = false
        }
        if (this.moveDirection === MoveDirection.jump) {
            const show = Math.floor((this.alltime * 10) % 4) + 23
            this.node.getChildByName(`mario_big_${show}`).active = true
        } else if (this.moveDirection === MoveDirection.right) {
            const show = Math.floor((this.alltime * 10) % 3) + 9
            this.node.getChildByName(`mario_big_${show}`).setScale(1, 1)
            this.node.getChildByName(`mario_big_${show}`).active = true
        } else if (this.moveDirection === MoveDirection.left) {
            const show = Math.floor((this.alltime * 10) % 3) + 9
            this.node.getChildByName(`mario_big_${show}`).setScale(-1, 1)
            this.node.getChildByName(`mario_big_${show}`).active = true
        } else {
            this.node.getChildByName(`mario_big_9`).active = true
        }
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
        if (this.jumpTime > 1) return;
        resources.load('audio/jump', AudioClip, (err, audio) => {
            this.node.getComponent(AudioSource).clip = audio;
            this.node.getComponent(AudioSource).play();
        })
        this.jumpTime++;
        this.node.getComponent(RigidBody2D).linearVelocity = v2(0, 6)
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
        switch (e.keyCode) {
            case KeyCode.KEY_D:
            case KeyCode.KEY_A:
                this.moveDirection = MoveDirection.none;
                break;
            case KeyCode.KEY_W:
            case KeyCode.SPACE:
                // this.moveDirection = MoveDirection.jump;
                // this.jump()
                break;
        }
    }

    onBeginContact(self, other, contact) {
        if (other?.tag === 1 || other?.tag === 2 || other?.tag === 3) {
            this.jumpTime = 0;
            if (this.moveDirection === MoveDirection.jump)
                this.moveDirection = MoveDirection.none;
            this.onGround = true;
        }
        if (other?.tag === 3) {
            if (contact.getWorldManifold().normal.y !== 1) {
                this.damage()
                other.node.getComponent(RigidBody2D).linearVelocity = v2(1, 0)
                this.node.setPosition(0, 0);
            }
        }
        if (other?.tag === 4) {
            if (other.node.name === 'Coin') {
                resources.load('audio/coin', AudioClip, (err, audio) => {
                    this.node.getComponent(AudioSource).clip = audio;
                    this.node.getComponent(AudioSource).play();
                })
                this.coin++;
                setTimeout(() => {
                    other.node.destroy();
                    other.destroy();
                }, 100)
            }
        }
    }

    onEndContact(contact, self, other) {

    }

    onPreSolve(contact, self, other) {
        if (other?.tag === 3) {
            other.node.getComponent(RigidBody2D).linearVelocity = v2(1, 0)
        }
    }
}

