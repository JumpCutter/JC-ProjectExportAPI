import {Generator} from "../baseGenerator";
import EDL from "edl_composer"; // yes, there are no TS declarations

import {Cut} from "../project";

export class ResolveEDL extends Generator {
    generate() {
        const edlIr = new EDL({
            "title": "JumpCutterExport",
            "events": this.cuts.map((cut: Cut, i: number) => {
                return {
                    "id": i,
                    "startTime": cut.start,
                    "endTime": cut.end,
                    "reelName": "N/A",
                    "clipName": this.clipName,
                    "fps": this.frameRate
                };
            })
        });
        return edlIr.compose();
    }
}
