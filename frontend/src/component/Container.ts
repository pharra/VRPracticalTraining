import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import Axios from 'axios';
import '@/lib/DebugLog';
import DebugLog from '@/lib/DebugLog';

class Container {
    private canvas: HTMLCanvasElement;
    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;
    private freeCamera: BABYLON.FreeCamera | null = null;
    private arcRotateCamera: BABYLON.ArcRotateCamera | null = null;
    private light: BABYLON.Light | null = null;
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
        this.preload();
    }


    public preload() {
        const that: Container = this;
        const assetsManager = new BABYLON.AssetsManager(this.scene);
        assetsManager.onProgress = (remainingCount, totalCount, lastFinishedTask) => {
            that.engine.loadingUIText = 'We are loading the scene. ' +
                remainingCount + ' out of ' + totalCount + ' items still need to be loaded.';
        };

        assetsManager.onFinish = (tasks) => {
            that.createScene();
            that.doRender();
        };
        Axios.get(this.url + 'config.json')
            .then((response) => {
                DebugLog(response.data);
                response.data.forEach((meshConfig: any) => {
                        const meshTask = assetsManager.addMeshTask(meshConfig.fileName, meshConfig.pName,
                        that.url + meshConfig.fileSrc, meshConfig.fileName);
                        meshTask.onSuccess = (task) => {
                        DebugLog('load sucess:' + that.url + meshConfig.fileSrc + ':' + meshConfig.fileName);
                        DebugLog(task.loadedMeshes);
                        DebugLog(task.loadedParticleSystems);
                        DebugLog(task.loadedSkeletons);
                        task.loadedMeshes.forEach((mesh) => {
                            mesh.actionManager = new BABYLON.ActionManager(that.scene);
                            mesh.actionManager.registerAction(
<<<<<<< HEAD
                                new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, that.HighlightObj));
=======
                                new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, that.testFunction));
                            console.log('run success');
>>>>>>> YjtBranch
                        });

                        // task.loadedMeshes[0].parent = this.freeCamera;
                    };

                        meshTask.onError = (task, message, exception) => {
                        DebugLog(message, exception);
                        console.log('Highlight Failed!');
                    };
                });


                assetsManager.load();
            }).catch((error) => {
                DebugLog(error);
            });
    }


    public createScene(): void {
        this.freeCamera = new BABYLON.FreeCamera('FreeCamera', new BABYLON.Vector3(0, 0, 0), this.scene);
        this.freeCamera.attachControl(this.canvas, true);

        // Create a basic light, aiming 0,1,0 - meaning, to the sky.
        this.light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this.scene);

        // this.scene.debugLayer.show();
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
        DebugLog('Run preIf function!');
        const m = evt.meshUnderPointer;
        if (m && m.renderOutline === false) {
            m.renderOutline = true;
            m.outlineWidth = 0.1;
            m.outlineColor = BABYLON.Color3.Yellow();
            DebugLog('Run function!');
            console.log('run success');
        } else if (m && m.renderOutline === true) {
            m.renderOutline = false;
        }
    }
    public testFunction(): void {
        console.log('Run test!');
    }
}



export { Container };
