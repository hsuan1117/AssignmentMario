import {_decorator, Component, director, EditBox, Label, AudioSource} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('HomeSceneController')
export class HomeSceneController extends Component {
    start() {
        // play bgm "bgm_1"
        this.node.on("click", () => {
            this.node.getChildByName("bgm_1").getComponent(AudioSource).play();
        })
        this.node.parent.getChildByName("MainController").getChildByName("alert").active = false;
    }

    update(deltaTime: number) {

    }

    onSignUpBtnClicked() {
        this.node.parent.getChildByName("DialogContainerForSignUp").active = true;
    }

    onCloseSignUpDialogBtnClicked() {
        this.node.parent.getChildByName("DialogContainerForSignUp").active = false;
    }

    onSignInBtnClicked() {
        this.node.parent.getChildByName("DialogContainerForLogin").active = true;
    }

    onCloseSignInDialogBtnClicked() {
        this.node.parent.getChildByName("DialogContainerForLogin").active = false;
    }

    login() {
        // @ts-ignore
        firebase.auth().signInWithEmailAndPassword(
            this.node.parent.getChildByName("DialogContainerForLogin").getChildByName("DialogLogin").getChildByName("Email").getComponent(EditBox).string,
            this.node.parent.getChildByName("DialogContainerForLogin").getChildByName("DialogLogin").getChildByName("Password").getComponent(EditBox).string
        ).then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            this.node.parent.getChildByName("DialogContainerForLogin").active = false;
            director.loadScene("MenuScene");
        }).catch((error) => {
            this.node.parent.getChildByName("MainContainer").getChildByName("alert").getChildByName("Label").getComponent(Label).string = error.message;
            this.node.parent.getChildByName("DialogContainerForLogin").active = false;
            this.node.parent.getChildByName("MainContainer").getChildByName("alert").active = true;
        });
    }

    signUp() {
        // @ts-ignore
        firebase.auth().createUserWithEmailAndPassword(
            this.node.parent.getChildByName("DialogContainerForSignUp").getChildByName("DialogSignUp").getChildByName("Email").getComponent(EditBox).string,
            this.node.parent.getChildByName("DialogContainerForSignUp").getChildByName("DialogSignUp").getChildByName("Password").getComponent(EditBox).string
        ).then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            this.node.parent.getChildByName("DialogContainerForSignUp").active = false;
            director.loadScene("MenuScene");
        }).catch((error) => {
            this.node.parent.getChildByName("MainContainer").getChildByName("alert").getChildByName("Label").getComponent(Label).string = error.message;
            this.node.parent.getChildByName("DialogContainerForSignUp").active = false;
            this.node.parent.getChildByName("MainContainer").getChildByName("alert").active = true;
        });
    }

    onCloseAlertBtnClicked() {
        this.node.parent.getChildByName("MainContainer").getChildByName("alert").active = false;
    }
}

