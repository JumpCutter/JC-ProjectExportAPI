import {Generator} from "./baseGenerator";
import EDL from "edl_composer"; // yes, there are no TS declarations

import {Cut, Cuts, Project, Layer, } from "./project";
import path from "path";


export class ResolevEdl extends Generator {


  generate() {
    const edlIr = new EDL({
      "title": path.parse(this.project.outFile).name,
      "events": this.cuts!.map((cut: Cut, i: number) => {
        return {
          "id": i,
          "startTime": cut.start,
          "endTime": cut.end,
          "reelName": "N/A",
          "clipName": this.clipName,
          "fps": this.frameRate
        }
      })
    });
    return edlIr.compose();
  }


  private layer: Layer;
  private cuts: Cuts;
  private frameRate: number;
  private clipName: string;

  constructor(project: Project) {
    super(project);
    this.layer = this.ensureSingleLayer();
    this.frameRate = this.project.frameRate;
    this.clipName = this.layer.sourceFile;
    this.cuts = this.ensureCuts(this.layer);
  }
}
