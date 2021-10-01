import {Generator} from "../baseGenerator";
import {vegasEDLBuilder} from "./helpersVegasEDL";

export default class vegasEDL extends Generator {

    // the main thing
    generate() {
        const builder = new vegasEDLBuilder();
        let idCounter = 0;
        builder.mediaTypes.forEach((mtype, i) => {
            this.cuts.forEach((cut) => {
                builder.buildContextManager(() => {
                    builder
                        .putID(++idCounter)
                        .putTrack(i)
                        .putStartTime(cut.start)
                        .putLength(cut.end - cut.start)
                        .putFirstDefualts()
                        .putMediaType(mtype)
                        .putFileName(this.clipName)
                        .putStream()
                        .putStreamStart(cut.start)
                        .putStreamLength(cut.end - cut.start)
                        .putSecondDefualts();
                });
            })
        })
        return builder.data;
    }
}

