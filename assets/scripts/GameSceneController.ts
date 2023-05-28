import {
    _decorator,
    Component,
    v2, v3,
    BoxCollider2D,
    PhysicsSystem2D,
    EPhysics2DDrawFlags,
    TiledMap,
    RigidBody2D,
    CircleCollider2D,
    Size,
    Camera,
    Node,
    instantiate, Label,
    Prefab, Contact2DType,
    resources
} from 'cc';
import {Player} from "db://assets/scripts/Player";
import {WallController} from "db://assets/scripts/WallController";

const {ccclass, property} = _decorator;

@ccclass('GameSceneController')
export class GameSceneController extends Component {
    private timer = 0;

    /**
     * Collider Tag
     * 0:
     * 1: ground
     * 2: box
     * 3: enemy
     * 4: bonus
     * */
    onLoad() {
        PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Shape;

        // traverse all the pixel of the map, generate collider2D for the wall
        let map = this.node.getChildByName('MarioMap').getComponent(TiledMap)
        map.getLayers().forEach(layer => {
            for (let x = 0; x < layer.getLayerSize().width; x++) {
                for (let y = 0; y < layer.getLayerSize().height; y++) {
                    let gid = layer.getTileGIDAt(x, y)
                    if (gid !== 0) {
                        const props = map.getPropertiesForGID(gid)
                        if (props?.Block) {
                            //const rigidBody = map.addComponent(RigidBody2D)
                            //rigidBody.enabledContactListener = true
                            const collider = map.addComponent(BoxCollider2D)
                            const startX = 8
                            const startY = 8
                            collider.offset = v2(x * 16 + startX, (layer.getLayerSize().height - y - 1) * 16 + startY)
                            collider.size = new Size(16, 16)
                            collider.tag = Number(props.tag)
                            collider.restitution = 0
                            collider.friction = 0
                            collider.enabled = true
                            if (collider) {
                                collider.on(Contact2DType.BEGIN_CONTACT, (self, other, contact) => {
                                    //console.log(contact.getWorldManifold().normal)
                                    if (contact.getWorldManifold().normal.y === -1) {
                                        contact.disabled = true
                                    }
                                }, this);
                                collider.on(Contact2DType.END_CONTACT, (self, other, contact) => {

                                }, this);
                            }
                        }
                    }
                }
            }
            console.log(layer)
        })
        const enemies = map.getObjectGroup("Enemy")
        enemies.getObjects().forEach(obj => {
            // @ts-ignore
            if (obj?.T === 'mushroom') {
                resources.load("prefabs/Mushroom", Prefab, (err, prefab) => {
                    const goomba = instantiate(prefab)
                    goomba.setPosition(-480 + obj.x, -320 + obj.y, 0)
                    this.node.addChild(goomba)
                });
            }
        })
        const bonus = map.getObjectGroup("Bonus")
        bonus.getObjects().forEach(obj => {
            // @ts-ignore
            if (obj?.T === 'coin') {
                resources.load("prefabs/Coin", Prefab, (err, prefab) => {
                    const coin = instantiate(prefab)
                    coin.setPosition(-480 + obj.x, -320 + obj.y, 0)
                    coin.getComponent(BoxCollider2D).tag = 4
                    this.node.addChild(coin)
                });
            }
        })
        map.getObjectGroups().forEach(group => {
            group.getObjects().forEach(obj => {
                // @ts-ignore
                if (obj?.T === 'mario') {
                    resources.load("prefabs/Mario", Prefab, (err, prefab) => {
                        const mario = instantiate(prefab)
                        mario.setPosition(-480 + obj.x, -320 + obj.y, 0)
                        this.node.addChild(mario)
                    });
                    // @ts-ignore
                } else if (obj?.T === 'wall') {
                    // create a child to hold the wall
                    resources.load("prefabs/Wall", Prefab, (err, prefab) => {
                        const mario = instantiate(prefab)
                        mario.setPosition(-480 + obj.x, -320 - 8 + obj.y, 0)
                        // @ts-ignore
                        if (obj?.mario) {
                            mario.getComponent(WallController).mario = true
                        }
                        this.node.addChild(mario)
                    });
                    // @ts-ignore
                } else if (obj?.T === 'finish') {
                    // create a child to hold the wall
                    resources.load("prefabs/Finish", Prefab, (err, prefab) => {
                        const finish = instantiate(prefab)
                        finish.setPosition(-480 + obj.x, -320 - 8 + obj.y, 0)
                        this.node.addChild(finish)
                    });
                    // @ts-ignore
                } else if (obj?.T === "Q") {
                    resources.load("prefabs/QuestionBlock", Prefab, (err, prefab) => {
                        const qb = instantiate(prefab)
                        qb.setPosition(-480 + obj.x, -320 + obj.y, 0)
                        this.node.addChild(qb)
                    });
                }
            })
        })
    }

    start() {

    }

    update(deltaTime: number) {
        this.timer += deltaTime
        const camera = this.node.getComponentInChildren(Camera)
        if (this.node.getChildByName('Mario'))
            camera.node.setPosition(this.node.getChildByName('Mario').position)

        const lifeLabel = this.node.getChildByName('Life')
        if (lifeLabel && this.node.getChildByName('Mario')) {
            lifeLabel.setPosition(camera.node.position.x, camera.node.position.y + 280)
            lifeLabel.getComponent(Label).string = 'Life: ' + this.node.getChildByName('Mario').getComponent(Player).life + ' Coin: ' + this.node.getChildByName('Mario').getComponent(Player).coin
        }

        const timerLabel = this.node.getChildByName('Timer')
        if (timerLabel && this.node.getChildByName('Mario')) {
            timerLabel.setPosition(camera.node.position.x, camera.node.position.y + 220)
            timerLabel.getComponent(Label).string = 'Timer: ' + this.timer.toFixed(2)
        }
    }
}

