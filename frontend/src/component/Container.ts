import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import Axios from 'axios';

class Container {
    private canvas: HTMLCanvasElement;
    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;
    private freeCamera: BABYLON.FreeCamera | null = null;
    private arcRotateCamera: BABYLON.ArcRotateCamera | null = null;
    private light: BABYLON.Light | null = null;
    constructor(canvasElement: string, private url: string) {
        // Create canvas and engine.
        this.canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.preload();
    }


    public preload(): boolean {
        // Axios.get(this.url + '\\config.json')
        // .then((response) => {
        // }).catch((error) => {
        // });

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
        const meshTask = assetsManager.addMeshTask('stone task', 'stone',
        '/static/objectModel/fps_q3_2/', 'fps_q3_2.babylon');
        meshTask.onSuccess = (task) => {
            console.log('load stone sucess');
            console.log(meshTask.loadedParticleSystems);
            // task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
        };
        meshTask.onError = (task, message, exception) => {
            console.log(message, exception);
        }
        assetsManager.load();
        return false;
    }


    public createScene(): void {
        // Create a basic BJS Scene object.
        this.arcRotateCamera = new BABYLON.ArcRotateCamera('camera', 0, 0, 10, BABYLON.Vector3.Zero(), this.scene);


        // Attach the camera to the canvas.
        this.arcRotateCamera.attachControl(this.canvas, false);

        // Create a basic light, aiming 0,1,0 - meaning, to the sky.
        this.light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this.scene);
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
}



export { Container };
