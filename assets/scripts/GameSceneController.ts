import {
    _decorator,
    Component,
    v2,
    BoxCollider2D,
    TiledLayer,
    PhysicsSystem2D,
    EPhysics2DDrawFlags,
    TiledMap,
    Size
} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('GameSceneController')
export class GameSceneController extends Component {
    onLoad() {
        PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Shape;

        // traverse all the pixel of the map, generate collider2D for the wall
        let map = this.node.getChildByName('MarioMap').getComponent(TiledMap)
        const layer = map.getLayer("Ground")
        // layer.tiles.forEach((gid, idx) => {
        //     if (gid !== 0) {
        //
        //     }
        // })
        for (let x = 0; x < layer.getLayerSize().width; x++) {
            for (let y = 0; y < layer.getLayerSize().height; y++) {
                let gid = layer.getTileGIDAt(x, y)
                if (gid !== 0) {
                    if (map.getPropertiesForGID(gid)?.Block) {
                        const collider = this.node.getComponentInChildren(TiledMap).addComponent(BoxCollider2D)
                        const startX = -480
                        const startY = -240
                        console.log(x, layer.getLayerSize().height - y)
                        collider.offset = v2(x * 16 + startX, (layer.getLayerSize().height - y) * 16 + startY)
                        collider.size = new Size(16, 16)
                        collider.enabled = true
                    }
                }
            }
        }
        console.log(layer)
    }

    start() {

    }

    update(deltaTime: number) {

    }
}

