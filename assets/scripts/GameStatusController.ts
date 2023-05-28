import {_decorator, Component, Node, director} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('GameStatusController')
export class GameStatusController extends Component {
    start() {

    }

    update(deltaTime: number) {

    }

    backToMenu() {
        director.loadScene('HomeScene')
    }
}

