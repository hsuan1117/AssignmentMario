import {
    _decorator,
    Component,
    v2,
    BoxCollider2D,
    PhysicsSystem2D,
    EPhysics2DDrawFlags,
    TiledMap,
    RigidBody2D,
    Size,
    Camera,
    instantiate,
    Prefab, Contact2DType,
    resources
} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('GameSceneController')
export class GameSceneController extends Component {
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
                                    console.log(contact.getWorldManifold().normal)
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
        map.getObjectGroups().forEach(group => {
            group.getObjects().forEach(obj => {
                // @ts-ignore
                if (obj?.T === 'mario') {
                    resources.load("prefabs/Mario", Prefab, (err, prefab) => {
                        const mario = instantiate(prefab)
                        this.node.addChild(mario)
                    });
                }
            })
        })
    }

    start() {

    }

    update(deltaTime: number) {
        const camera = this.node.getComponentInChildren(Camera)
        if (this.node.getChildByName('Mario'))
            camera.node.setPosition(this.node.getChildByName('Mario').position)
    }
}

