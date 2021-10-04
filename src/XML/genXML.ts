import path from "path";
import {Generator} from "../baseGenerator";
import {xmlBuilder} from "./helpersXML";

export class XML extends Generator {
    generate(): string {
        const builder = new xmlBuilder();
        builder.buildContext(path.parse(this.clipName).name, this.frameRate, this.cuts[this.cuts.length - 1].end, () => {
            this.cuts.forEach((cut) => {
                builder.putClipitem(this.clipName, cut.start, cut.end, 720, 1270); // FIXME: needs resolution!!!!!!!
            });
        });
        return builder.data;
    }
}
