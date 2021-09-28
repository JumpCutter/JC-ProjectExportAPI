import {Project, Layer, Cuts} from "./project";
export abstract class Generator {

  project: Project;
  constructor(project: Project) {
    this.project = project;
  }


  protected ensureSingleLayer(): Layer {
    const layers = this.project.layers;
    if (layers == null || layers == undefined) {
      throw new Error("No layers!!!");
    }
    if (layers[0] == null || layers[0] == undefined) {
      throw new Error("No layers inside of the layers!!!");
    }
    if (layers[0][0] == null || layers[0][0] == undefined) {
      throw new Error("No layers inside of the layers insode of the layers?!!!");
    }
    if (layers.length > 1 || layers[0].length > 1) {
      throw new Error("What do I do with this many layers?");
    }
    return layers[0][0];
  }

  protected ensureCuts(layer: Layer): Cuts {
    if (layer.cuts == null || layer.cuts == undefined) {
      throw new Error("No cuts");
    }
    return layer.cuts;
  }



  abstract generate(): string;


};
