import {Generator} from "../baseGenerator";
import {fcpxmlBuilder} from "./helpersFCPXML";
import path from "path";


export class FCPXML extends Generator {
    generate(): string {
        const builder = new fcpxmlBuilder();
        builder.buildContext(() => {
            builder.resourcesBuildContext(1 / this.frameRate, () => {
                builder.putAsset(this.clipName, this.cuts[this.cuts.length - 1].end);
            });

            builder.projectBuildContext(
                "JumpCutterExport", this.cuts[this.cuts.length - 1].end, () => {
                    this.cuts.forEach((cut) => {
                        builder.putClip(
                            path.basename(this.clipName), cut.start, cut.end - cut.start);
                    });
                });
        });
        return builder.data;
    }
}
