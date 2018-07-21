import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import Axios from 'axios';
import DebugLog from '@/lib/DebugLog';
import 'babylonjs-gui';
import Share from './Share';

class Container {
    private canvas: HTMLCanvasElement;
    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;
    private freeCamera: BABYLON.FreeCamera | null = null;
    private light: BABYLON.Light | null = null;
    private configJson: any | null = null;
    private showMainScene: boolean = true;
    private toolButtons: BABYLON.GUI.Button[] = [];
    private skyBox: BABYLON.Mesh | null = null;
    private skyboxMaterial: BABYLON.StandardMaterial | null = null;
    private box1: BABYLON.Mesh | null = null;
    private box2: BABYLON.Mesh | null = null;
    private box3: BABYLON.Mesh | null = null;
    private box4: BABYLON.Mesh | null = null;
    private box5: BABYLON.Mesh | null = null;
    private box6: BABYLON.Mesh | null = null;
    /**
     * create the container using the url of selected project
     * @param canvasElement canvas id
     * @param url the url for project, end with /
     */
    constructor(canvasElement: string, public url: string) {
        // Create canvas and engine.
        this.canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.skyBox = BABYLON.Mesh.CreateBox('skyBox', 200.0, this.scene);
        this.skyBox.position = new BABYLON.Vector3(0, 100, 0);
        this.skyboxMaterial = new BABYLON.StandardMaterial('skyBox', this.scene);
        this.skyboxMaterial.backFaceCulling = false;
        this.skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('/static/share/textures/skybox', this.scene);
        this.skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        this.skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        this.skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        this.skyBox.material = this.skyboxMaterial;
        // 防止相机进入天空盒外的6个辅助盒子
        this.box1 = BABYLON.Mesh.CreateBox('box1', 200, this.scene);
        this.box2 = BABYLON.Mesh.CreateBox('box1', 200, this.scene);
        this.box3 = BABYLON.Mesh.CreateBox('box1', 200, this.scene);
        this.box4 = BABYLON.Mesh.CreateBox('box1', 200, this.scene);
        this.box5 = BABYLON.Mesh.CreateBox('box1', 200, this.scene);
        this.box6 = BABYLON.Mesh.CreateBox('box1', 200, this.scene);
        this.box1.position = new BABYLON.Vector3(0, 100, -201);
        this.box2.position = new BABYLON.Vector3(201, 100, 0);
        this.box3.position = new BABYLON.Vector3(0, 100, 201);
        this.box4.position = new BABYLON.Vector3(-201, 100, 0);
        this.box5.position = new BABYLON.Vector3(0, 301, 0);
        this.box6.position = new BABYLON.Vector3(0, -101, 0);
        this.box1.checkCollisions = true;
        this.box2.checkCollisions = true;
        this.box3.checkCollisions = true;
        this.box4.checkCollisions = true;
        this.box5.checkCollisions = true;
        this.box6.checkCollisions = true;
        this.loadToolButtons();

        this.preload();
    }

    /**
     * load toolButtons to this.toolButtons
     */
    private loadToolButtons() {


        // create && setting switch button style
        const switchButton = BABYLON.GUI.Button.CreateImageOnlyButton('switch', '/static/share/operation.png');
        switchButton.width = '30px';
        switchButton.height = '30px';
        switchButton.thickness = 0;
        switchButton.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        switchButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        switchButton.onPointerClickObservable.clear();
        switchButton.onPointerClickObservable.add(() => {
            this.switchToMainScene();
        });

        this.toolButtons.push(switchButton);
    }

    private preload() {
        Axios.get(this.url + 'config.json')
            .then((response) => {
                DebugLog(this.url);
                DebugLog(response.data);
                this.configJson = response.data;
                this.loadScene();
            }).catch((error) => {
                DebugLog(error);
            });
    }


    private loadScene() {
        const assetsManager = new BABYLON.AssetsManager(this.scene);
        assetsManager.onProgress = (remainingCount, totalCount, lastFinishedTask) => {
            this.engine.loadingUIText = 'We are loading the scene. ' +
                remainingCount + ' out of ' + totalCount + ' items still need to be loaded.';
        };

        assetsManager.onFinish = (tasks) => {
            // const mesh = this.scene.getMeshByName('landspace');
            // if(mesh){
            //     mesh.scaling=
            // }
            this.createScene();
            this.renderScene(this.scene);
        };
        this.configJson[0].scene.forEach((meshConfig: any) => {
            const meshTask = assetsManager.addMeshTask(meshConfig.fileName, meshConfig.pName,
                this.url + meshConfig.fileSrc, meshConfig.fileName);
            meshTask.onSuccess = (task) => {
                DebugLog('load sucess:' + this.url + meshConfig.fileSrc + ':' + meshConfig.fileName);
                task.loadedMeshes.forEach((mesh) => {
                    // mesh.position = BABYLON.Vector3.Zero();
                    mesh.checkCollisions = true;
                    mesh.actionManager = new BABYLON.ActionManager(this.scene);
                    mesh.actionManager.registerAction(
                        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, this.switchToSecondScene));
                    DebugLog('run meshTask success:' + mesh.name);
                });

                // task.loadedMeshes[0].parent = this.freeCamera;
            };

            meshTask.onError = (task, message, exception) => {
                DebugLog(message, exception);
                DebugLog('run meshTask failed');
            };
        });
        assetsManager.load();
    }



    private createScene(): void {
        this.scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
        this.scene.collisionsEnabled = true;
        this.freeCamera = new BABYLON.FreeCamera('FreeCamera', new BABYLON.Vector3(0, 40, 0), this.scene);
        this.freeCamera.attachControl(this.canvas, true);
        this.freeCamera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
        this.freeCamera.checkCollisions = true;
        // this.freeCamera.applyGravity = true;
        // Let's remove default keyboard:
        // this.freeCamera.inputs.removeByType('FreeCameraKeyboardMoveInput');
    // Create our own manager:
    // Connect to camera:
        // this.freeCamera.inputs.add(this.FreeCameraKeyboardRotateInput());

        // Create a basic light, aiming 0,1,0 - meaning, to the sky.
        this.light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this.scene);
        // this.scene.debugLayer.show();
        // const texture = new BABYLON.CubeTexture('/textures/SpecularHDR.dds', this.scene);
        // this.scene.createDefaultSkybox(texture, true, 100);
    }

    private createGUI(scene: BABYLON.Scene): BABYLON.GUI.AdvancedDynamicTexture {
        const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', true,
            scene);
        DebugLog('createGUI:' + advancedTexture.name);

        for (const button of this.toolButtons) {
            advancedTexture.addControl(button);
        }
        return advancedTexture;
    }

    private renderScene(scene: BABYLON.Scene) {
        setTimeout(() => {
            this.engine.stopRenderLoop();
            const advancedTexture = this.createGUI(scene);
            this.engine.runRenderLoop(() => {
                // advancedTexture.dispose();
                scene.render();
                // this.scene.debugLayer.show();
                window.removeEventListener('resize', () => {
                    this.engine.resize();
                });
                window.addEventListener('resize', () => {
                    this.engine.resize();
                });
            });
        }, 500);
    }

    private switchToSecondScene = (evt: BABYLON.ActionEvent) => {
        if(!this.showMainScene){
            return;
        }
        const m = evt.meshUnderPointer;

        if (m) {
            DebugLog('switchToSecondScene:' + m.name);
            BABYLON.SceneLoader.Load(this.url + 'obj/', m.name + '.obj', this.engine, (newScene) => {
                const ArcRotateCamera = new BABYLON.ArcRotateCamera('ArcRotateCamera', 0, 0, 100,
                    BABYLON.Vector3.Zero(), newScene);
                ArcRotateCamera.attachControl(this.canvas, true);

                // Create a basic light, aiming 0,1,0 - meaning, to the sky.
                const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), newScene);
                this.renderScene(newScene);
            });
        }
        this.showMainScene = false;


        // if (m && m.renderOutline === false) {

        //     m.renderOutline = true;
        //     m.outlineWidth = 0.1;
        //     m.outlineColor = BABYLON.Color3.Yellow();
        //     DebugLog('Run function: HighlightObj!');

        //     DebugLog(m);
        // } else if (m && m.renderOutline === true) {
        //     DebugLog('Run function: Remove HighlightObj!');
        //     m.renderOutline = false;
        // }
    }

    private switchToMainScene = () => {
        this.renderScene(this.scene);
        this.showMainScene = true;
    }

}

export { Container };
