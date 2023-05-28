import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LevelSelectSceneController')
export class LevelSelectSceneController extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    changeScene(evt) {
        director.loadScene("GameScene");
    }
    changeScene2(evt) {
        director.loadScene("GameScene2");
    }
}

