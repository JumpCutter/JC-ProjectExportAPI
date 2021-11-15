import path from "path";
import {Generator} from "../baseGenerator";
import {xmlBuilder} from "./helpersXML";

// https://fcp.co/final-cut-pro/tutorials/1912-demystifying-final-cut-pro-xmls-by-philip-hodgetts-and-gregory-clarke
export class XML extends Generator {
    generate(): string {
        const builder = new xmlBuilder();
        const [width, height] = (() => {
            const split = this.resolution?.split('x');
            return split ? split.map(n=>parseInt(n)) : [null, null];
        })();
        builder.buildContext(path.parse(this.clipName).name, width, height, this.frameRate, this.cuts[this.cuts.length - 1].end, () => {
            this.cuts.forEach((cut) => {
                builder.putClipitem(this.clipName, cut.start, cut.end);
            });
        });
        return builder.data;
    }
}
