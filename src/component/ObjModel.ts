import { float } from "babylonjs";

class ObjModel{
    private ModelSrc: string;
    private ModelType: string;
    private Scale: float;
    constructor(src: string, tp: string, Sc: float){
        this.ModelSrc = src;
        this.ModelType = tp;
        this.Scale = Sc;
    }
    
    public GetModelSrc(): string{
        return this.ModelSrc;
    }
    public GetModelType(): string{
        return this.ModelType;
    }

    public GetScale(): float{
        return this.Scale;
    }
    public SetModelSrc(src: string): void{
        this.ModelSrc = src;
    }
    public SetModelType(tp: string): void{
        this.ModelType = tp;
    }
    public SetScale(sc: float): void{
        this.Scale = sc;
    }
}