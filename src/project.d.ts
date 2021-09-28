export interface Project {
  outFile: string;
  resolution?: null;
  frameRate: number;
  layers?: Layers;
}


export type Layers = ((Layer)[] | null)[] | null;
export interface Layer {
  sourceFile: string;
  timelineStart: number;
  speed: Speed;
  opType: string;
  cuts?: Cuts;
}

export type Cuts = (Cut)[] | null;
export interface Cut {
  start: number;
  end: number;
}

export interface Speed {
  silent?: null;
  sounded: number;
}
