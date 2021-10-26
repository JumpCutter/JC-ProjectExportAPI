export interface Project {
    outFile: string;
    resolution: string | null;
    frameRate: number;
    layers?: Layers | null;
}


export type Layers = ((Layer)[] | null)[];
export interface Layer {
    sourceFile: string;
    timelineStart: number;
    speed: Speed;
    opType: string;
    cuts?: Cuts | null;
}

export type Cuts = Cut[];
export interface Cut {
    start: number;
    end: number;
}

export interface Speed {
    silent?: null;
    sounded: number;
}


export interface Options{
    keepSilent: boolean,
}
