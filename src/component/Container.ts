import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import Axios from 'axios';
import DebugLog from '@/lib/DebugLog';
import 'babylonjs-gui';

class Container {
    private canvas: HTMLCanvasElement;
    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;
    private secondScene: BABYLON.Scene;
    private freeCamera: BABYLON.FreeCamera | null = null;
    private arcRotateCamera: BABYLON.ArcRotateCamera | null = null;
    private light: BABYLON.Light | null = null;
    private configJson: any | null = null;
    private showMainScene: boolean = true;
    private advancedTexture: BABYLON.GUI.AdvancedDynamicTexture;
    private secondAdvancedTexture: BABYLON.GUI.AdvancedDynamicTexture;
    private button: BABYLON.GUI.Button;
    private choseObject: BABYLON.AbstractMesh | null = null;


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
        this.secondScene = new BABYLON.Scene(this.engine);
        this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', true,
        this.scene);
        this.secondAdvancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI',
        true, this.secondScene);
        this.button = BABYLON.GUI.Button.CreateSimpleButton('switch', 'details');
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
            this.createGUI();
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

        this.arcRotateCamera = new BABYLON.ArcRotateCamera('arcRotateCemera',
            0, 0, 10, BABYLON.Vector3.Zero(), this.secondScene);
        this.arcRotateCamera.attachControl(this.canvas, true);

        // Create a basic light, aiming 0,1,0 - meaning, to the sky.
        this.light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this.secondScene);
    }

    public createGUI() {

        this.button.width = 0.2;
        this.button.height = '40px';
        this.button.color = 'white';
        this.button.background = 'green';
        this.button.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

        this.button.onPointerClickObservable.clear();
        this.button.onPointerClickObservable.add(() => {
            DebugLog(this.showMainScene);
            this.showMainScene = !this.showMainScene;
        });

        if (this.showMainScene) {
            this.advancedTexture.addControl(this.button);
        } else {
            this.secondAdvancedTexture.addControl(this.button);
        }
    }

    public switchScene(advancedTexture: BABYLON.GUI.AdvancedDynamicTexture) {
        // setTimeout(() => {
        DebugLog('render');
        this.engine.stopRenderLoop();
        this.engine.runRenderLoop(() => {
            if (this.showMainScene) {
                // advancedTexture.dispose();
                this.createGUI();
                this.scene.render();
            } else {
                // advancedTexture.dispose();
                this.createGUI();
                this.secondScene.render();
            }
        });
        // }, 500);
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
        this.choseObject = m;
        // DebugLog(m);
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
