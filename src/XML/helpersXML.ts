import {baseXMLBUilder} from "./common";
import path from "path";

export class xmlBuilder extends baseXMLBUilder {
    private clipitemIDs: string[] = [];
    private timeBase: number = -1;
    private duration: string = "";
    private registeredFile: boolean = false;
    private width: number | null = -1;
    private height: number | null = -1;
    public buildContext(name: string, width: number | null, height: number | null, frameRate: number, duration: number, l: () => void) {
        this.width = width;
        this.height = height;
        this.timeBase = frameRate;
        this.duration = (frameRate * duration).toFixed(0);
        this.putTag("xmeml", {version: this.conf.version}, () => {
            this.putTag("project", {}, () => {
                this.putTag("name", {}, name);
                this.putTag("children", {}, () => {
                    this.putTag("sequence", {id: this.conf.sequenceID}, () => {
                        this.putTag("name", {}, name);
                        this.putTag("duration", {}, this.duration); // FIXME: Duration is only up to the end of the last cut
                        this.putTag("rate", {}, () => {
                            this.putTag("timebase", {}, this.timeBase.toString());
                            this.putTag("ntsc", {}, this.putBool(this.conf.ntsc)); // FIXME: ???
                        });
                        this.putTag("media", {}, () => {
                            this.putTag("video", {}, () => {
                                this.putTag("track", {}, l);
                                this.putTag("format", {}, () => {
                                    this.putTag("samplecharacteristics", {}, () => {
                                        this.height && this.putTag("height", {}, this.height.toString());
                                        this.width && this.putTag("width", {}, this.width.toString())
                                        this.putTag("pixelaspectratio", {}, this.conf.pixelAspectRatio);
                                    })
                                });
                            });
                            this.putTag("audio", {}, () => {
                                this.putTag("track", {}, () => {
                                    this.clipitemIDs.forEach((id) => {
                                        this.putTag("clipitem", {id});
                                    });
                                });

                            });
                        });
                        this.putTag("timecode", {}, () => {
                            this.putTag("rate", {}, () => {
                                this.putTag("timebase", {}, this.timeBase.toString());
                                this.putTag("ntsc", {}, this.putBool(this.conf.ntsc));
                            });
                            this.putTag("string", {}, this.conf.zeroTimecode); // why???
                            this.putTag("frame", {}, this.conf.zeroFrame);
                            this.putTag("displayformat", {}, this.conf.displayFormat);
                        });
                    });
                });
            });
        });
    }

    public putClipitem(filePath: string, start: number, end: number) {
        const rate = () => {
            this.putTag("timebase", {}, this.timeBase.toString());
            this.putTag("ntsc", {}, this.putBool(this.conf.ntsc));
        };
        this.putTag("clipitem", {frameBlend: this.putBool(this.conf.frameBlend), id: this.genID(), }, () => {
            this.putTag("media", {}, () => {
                this.putTag("video", {}, () => {
                    this.putTag("samplecharacteristics", {}, () => {
                        this.height && this.putTag("height", {}, this.height.toString());
                        this.width && this.putTag("width", {}, this.width.toString())
                    });
                });
            });
            this.putTag("file", {id: this.conf.fileID}, this.genFile(filePath, rate));
            this.putTag("name", {}, filePath);
            this.putTag("rate", {}, rate);
            this.putTag("rate", {}, rate); // XXX: no idea. Original did this and original works so ¯\_(ツ)_/¯
            const startF = start * this.timeBase;
            const endF = end * this.timeBase;
            this.putTag("duration", {}, (endF - startF).toFixed());
            this.putTag("start", {}, startF.toFixed());
            this.putTag("end", {}, endF.toFixed());
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

    private genFile(filePath: string, rate: () => void): (() => void) | undefined {
        /*
            XXX: this looks weird, but it is being passed to a function with an optional parameter,
            so it's expecting another function or undefined.
        */
        if (!this.registeredFile) {
            this.registeredFile = true;
            return () => {
                this.putTag("pathurl", {}, filePath);
                this.putTag("name", {}, path.basename(filePath));
                this.putTag("rate", {}, rate);
                this.putTag("duration", {}, this.duration);
                this.putTag("timecode", {}, () => {
                    this.putTag("rate", {}, rate);
                    this.putTag("string", {}, this.conf.zeroTimecode); // why???
                    this.putTag("frame", {}, this.conf.zeroFrame);
                    this.putTag("displayformat", {}, this.conf.displayFormat);
                });
                this.putTag("media", {}, () => {
                    this.putTag("video", {});
                    this.putTag("audio", {});
                });
            };
        }
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
        pixelAspectRatio: 1.0.toFixed(1)
    } as const;

}
