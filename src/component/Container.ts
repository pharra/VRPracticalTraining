import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import Axios from 'axios';
import DebugLog from '@/lib/DebugLog';
import 'babylonjs-gui';

class Container {
    private canvas: HTMLCanvasElement;
    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;
    private choseScene: BABYLON.Scene;
    private freeCamera: BABYLON.FreeCamera | null = null;
    private arcRotateCamera: BABYLON.ArcRotateCamera | null = null;
    private light: BABYLON.Light | null = null;
    private configJson: any | null = null;
    private showMainScene: boolean = true;
    private advancedTexture: BABYLON.GUI.AdvancedDynamicTexture | null = null;


    /**
     * create the container using the url of selected project
     * @param canvasElement canvas id
     * @param url the url for project, end with /
     */
    constructor(canvasElement: string, private url: string) {
        // Create canvas and engine.
        this.canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.choseScene = new BABYLON.Scene(this.engine);
        this.preload();
    }


    public preload() {
        Axios.get(this.url + 'config.json')
            .then((response) => {
                DebugLog(response.data);
                this.configJson = response.data;
                this.loadScene();
            }).catch((error) => {
                DebugLog(error);
            });
    }


    public loadScene() {
        const assetsManager = new BABYLON.AssetsManager(this.scene);
        assetsManager.onProgress = (remainingCount, totalCount, lastFinishedTask) => {
            this.engine.loadingUIText = 'We are loading the scene. ' +
                remainingCount + ' out of ' + totalCount + ' items still need to be loaded.';
        };

        assetsManager.onFinish = (tasks) => {
            this.createScene();
            this.createGUI(this.showMainScene);
            if (this.advancedTexture) {
            this.switchScene(this.advancedTexture);
            }
        };
        this.configJson[0].scene.forEach((meshConfig: any) => {
            const meshTask = assetsManager.addMeshTask(meshConfig.fileName, meshConfig.pName,
                this.url + meshConfig.fileSrc, meshConfig.fileName);
            meshTask.onSuccess = (task) => {
                DebugLog('load sucess:' + this.url + meshConfig.fileSrc + ':' + meshConfig.fileName);
                task.loadedMeshes.forEach((mesh) => {
                    mesh.position = BABYLON.Vector3.Zero();
                    mesh.actionManager = new BABYLON.ActionManager(this.scene);
                    mesh.actionManager.registerAction(
                        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, this.HighlightObj));
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


    public createScene(): void {
        this.freeCamera = new BABYLON.FreeCamera('FreeCamera', new BABYLON.Vector3(0, 0, 0), this.scene);
        this.freeCamera.attachControl(this.canvas, true);

        // Create a basic light, aiming 0,1,0 - meaning, to the sky.
        this.light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this.scene);

        // this.scene.debugLayer.show();
    }

    public createGUI(showMainScene: boolean) {

        if (showMainScene) {
            this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', true, this.scene);
        } else {
            this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', true, this.choseScene);
        }
        const button: BABYLON.GUI.Button = BABYLON.GUI.Button.CreateSimpleButton('switch', 'details');
        this.advancedTexture.addControl(button);

        button.width = 0.2;
        button.height = '40px';
        button.color = 'white';
        button.background = 'green';
        button.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

        button.onPointerUpObservable.add(() => {
            this.showMainScene = !this.showMainScene;
        });
    }

    public switchScene(advancedTexture: BABYLON.GUI.AdvancedDynamicTexture) {
        this.engine.runRenderLoop(() => {
            if (this.showMainScene) {
                advancedTexture.dispose();
                this.createGUI(this.showMainScene);
                this.scene.render();
            } else {
                advancedTexture.dispose();
                this.createGUI(this.showMainScene);
                this.choseScene.render();
            }
        });
    }

    public doRender(): void {
        // Run the render loop.
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });

        // The canvas/window resize event handler.
        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }
    public HighlightObj(evt: BABYLON.ActionEvent): void {
        const m = evt.meshUnderPointer;
        if (m && m.renderOutline === false) {
            m.renderOutline = true;
            m.outlineWidth = 0.1;
            m.outlineColor = BABYLON.Color3.Yellow();
            DebugLog('Run function: HighlightObj!');
        } else if (m && m.renderOutline === true) {
            DebugLog('Run function: Remove HighlightObj!');
            m.renderOutline = false;
        }
    }
}



export { Container };
