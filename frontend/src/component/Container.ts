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
            task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
        };
        meshTask.onError = (task) => {
            console.log('load stone error');
        };
        assetsManager.load();
        return false;
    }


    public createScene(): void {
        // Create a basic BJS Scene object.
        this.scene = new BABYLON.Scene(this.engine);

        // Create a FreeCamera, and set its position to (x:0, y:5, z:-10).
        this.freeCamera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), this.scene);

        // Target the camera to scene origin.
        this.freeCamera.setTarget(BABYLON.Vector3.Zero());

        // Attach the camera to the canvas.
        this.freeCamera.attachControl(this.canvas, false);

        // Create a basic light, aiming 0,1,0 - meaning, to the sky.
        this.light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this.scene);

        // Create a built-in "ground" shape.
        const ground = BABYLON.MeshBuilder.CreateGround('ground',
            { width: 6, height: 6, subdivisions: 2 }, this.scene);
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
