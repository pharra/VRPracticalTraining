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
    private toolButtons: BABYLON.GUI.Button[] = [];
    private choseObject: BABYLON.AbstractMesh | null = null;


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
        this.secondScene = new BABYLON.Scene(this.engine);
        this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', true,
            this.scene);
        this.secondAdvancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI',
            true, this.secondScene);

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
            this.showMainScene = !this.showMainScene;
            DebugLog(this.choseObject);
            if (!this.showMainScene && this.choseObject) {
                this.secondScene.addMesh(this.choseObject);
            } else {
                this.showMainScene = !this.showMainScene;
            }
        });

        this.toolButtons.push(switchButton);
    }

    private preload() {
        Axios.get(this.url + 'config.json')
            .then((response) => {
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


    private createScene(): void {
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

    private createGUI() {

        if (this.showMainScene) {
            for (const button of this.toolButtons) {
                this.advancedTexture.addControl(button);
            }
        } else {
            for (const button of this.toolButtons) {
                this.secondAdvancedTexture.addControl(button);
            }
        }
    }

    private switchScene(advancedTexture: BABYLON.GUI.AdvancedDynamicTexture) {
        // setTimeout(() => {
        DebugLog('render');
        this.engine.stopRenderLoop();
        this.engine.runRenderLoop(() => {
            if (this.showMainScene) {
                // advancedTexture.dispose();
                this.createGUI();
                this.scene.render();
                window.removeEventListener('resize', () => {
                    this.engine.resize();
                });
                window.addEventListener('resize', () => {
                    this.engine.resize();
                });
                // this.scene.debugLayer.show();
            } else if (this.choseObject) {
                // advancedTexture.dispose();
                this.createGUI();
                this.secondScene.render();
                window.removeEventListener('resize', () => {
                    this.engine.resize();
                });
                window.addEventListener('resize', () => {
                    this.engine.resize();
                });
                // this.secondScene.debugLayer.show();
            }
        });
        // }, 500);
    }

    private doRender(): void {
        // Run the render loop.
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });

        // The canvas/window resize event handler.
        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }


    private HighlightObj(evt: BABYLON.ActionEvent): void {
        const m = evt.meshUnderPointer;
        if (m && m.renderOutline === false) {
            m.renderOutline = true;
            m.outlineWidth = 0.1;
            m.outlineColor = BABYLON.Color3.Yellow();
            DebugLog('Run function: HighlightObj!');
           // this.choseObject = m.clone(m.name, );
        } else if (m && m.renderOutline === true) {
            DebugLog('Run function: Remove HighlightObj!');
            m.renderOutline = false;
            this.choseObject = null;
        }
    }
}



export { Container };
