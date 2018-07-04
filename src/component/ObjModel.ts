import * as BABYLON from 'babylonjs';

class ObjModel {
    private ModelSrc: string;
    private ModelType: string;
    private Scale: BABYLON.float;
    constructor(src: string, tp: string, Sc: BABYLON.float) {
        this.ModelSrc = src;
        this.ModelType = tp;
        this.Scale = Sc;
    }

    public GetModelSrc(): string {
        return this.ModelSrc;
    }
    public GetModelType(): string {
        return this.ModelType;
    }

    public GetScale(): BABYLON.float {
        return this.Scale;
    }
    public SetModelSrc(src: string): void {
        this.ModelSrc = src;
    }
    public SetModelType(tp: string): void {
        this.ModelType = tp;
    }
    public SetScale(sc: BABYLON.float): void {
        this.Scale = sc;
    }
}
