import {baseXMLBUilder} from "./common";
import path from "path";

export class xmlBuilder extends baseXMLBUilder {
    private clipitemIDs: string[] = [];
    private timeBase: number = -1;
    private duration: string = "";
    public buildContext(name: string, frameRate: number, duration: number, l: () => void) {
        this.timeBase = frameRate;
        this.duration = (frameRate * duration).toFixed(0);
        this._data.push("<?xml version=\"1.0\"?>");
        this.putTag("xmeml", {version: this.conf.version}, () => {
            this.putTag("project", {}, () => {
                this.putTag("name", {}, name);
                this.putTag("children", {}, () => {
                    this.putTag("sequence", {id: this.conf.sequenceID}, () => {
                        this.putTag("name", {}, name);
                        this.putTag("duration", {}, this.duration);
                        this.putTag("rate", {}, () => {
                            this.putTag("timebase", {}, this.timeBase.toString());
                            this.putTag("ntsc", {}, this.putBool(this.conf.ntsc));
                        });
                        this.putTag("media", {}, () => {
                            this.putTag("video", {}, () => {
                                this.putTag("track", {}, l);
                            });
                            this.putTag("audio", {}, () => {
                                this.putTag("track", {}, () => {
                                    this.clipitemIDs.forEach((id) => {
                                        this.putTag("clipitem", {id});
                                    })
                                });

                            });
                        });
                    });
                });
            });
        });
    }

    public putClipitem(filePath: string, start: number, end: number, height: number, width: number) {
        const rate = () => {
            this.putTag("timebase", {}, this.timeBase.toString());
            this.putTag("ntsc", {}, this.putBool(this.conf.ntsc));
        };


        this.putTag("clipitem", {
            frameBlend: this.putBool(this.conf.frameBlend),
            id: this.genID(),
        }, () => {
            this.putTag("media", {}, () => {
                this.putTag("video", {}, () => {
                    this.putTag("samplecharacteristics", {}, () => {
                        this.putTag("height", {}, height.toString());
                        this.putTag("width", {}, width.toString());
                    });
                });
            });
            this.putTag("file", {id: this.conf.fileID}, () => {
                this.putTag("pathurl", {}, filePath);
                this.putTag("name", {}, path.basename(filePath));
                this.putTag("rate", {}, rate);
                this.putTag("duration", {}, this.duration);
                this.putTag("timecode", {}, () => {
                    this.putTag("rate", {}, rate);
                    this.putTag("string", {}, this.conf.zeroTimecode); // why???
                    this.putTag("frame", {}, this.conf.zeroFrame);
                    this.putTag("displayformat", {}, this.conf.displayFormat);
                    this.putTag("media", {}, () => {
                        this.putTag("video", {});
                        this.putTag("audio", {});
                    });
                });
            });
            this.putTag("name", {}, filePath);
            this.putTag("rate", {}, rate);
            this.putTag("start", {}, (start * this.timeBase).toFixed());
            this.putTag("end", {}, (end * this.timeBase).toFixed());
        });
    }

    private putBool(b: boolean): string {
        return b.toString().toUpperCase();
    }

    private genID(): string {
        const id = `clipitem-${this.clipitemIDs.length + 1}`;
        this.clipitemIDs.push(id);
        return id;
    }


    private conf = {
        version: "4",
        ntsc: true,
        sequenceID: "sequence-1",
        fileID: "file-1",
        frameBlend: false,
        zeroTimecode: "00:00:00:00",
        zeroFrame: "0",
        displayFormat: "NDF",
    } as const;

}
