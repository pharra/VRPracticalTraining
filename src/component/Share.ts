import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import Axios from 'axios';
import DebugLog from '@/lib/DebugLog';
import 'babylonjs-gui';

export default class Share {
    public static getShare(): Share {
        if (!this.share) {
            this.share = new Share();
        }
        return this.share;
    }

    private static share: Share;
    private choseMesh: BABYLON.Nullable<BABYLON.AbstractMesh> = null;

    private constructor() {
    }

    public setMesh(mesh: BABYLON.Nullable<BABYLON.AbstractMesh>) {
        this.choseMesh = mesh;
    }

    public getMesh(): BABYLON.Nullable<BABYLON.AbstractMesh> {
        return this.choseMesh;
    }

}