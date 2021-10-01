import {Generator} from "../baseGenerator";
import EDL from "edl_composer"; // yes, there are no TS declarations

import {Cut} from "../project";
import path from "path";


export default class ResolevEdl extends Generator {
  generate() {
    const edlIr = new EDL({
      "title": path.parse(this.clipName).name,
      "events": this.cuts.map((cut: Cut, i: number) => {
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
}
