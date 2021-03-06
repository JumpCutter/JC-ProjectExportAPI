import {baseXMLBUilder} from "../XML/common";

type Second = `${number}s`;

export class fcpxmlBuilder extends baseXMLBUilder {
    private IDs: {"format": string[], "asset": string[]} = {"format": [], "asset": []};
    public buildContext(l: () => void): void {
        this._data.push("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
        this._data.push("<!DOCTYPE fcpxml>");
        this.putTag("fcpxml", {"version": this.conf.version}, l);
    }

    public resourcesBuildContext(frameDuration: number, l: () => void): void {
        this.putTag("resources", {},
            () => {
                this.putTag("format", {
                    "id": this.genID("format"),
                    "frameDuration": this.putSeconds(frameDuration)
                });
                l();
            });
    }
    public projectBuildContext(name: string, duration: number, l: () => void): fcpxmlBuilder {
        this.putTag("project", {name, uid: ""}, () => {
            this.putTag("sequence", {duration: this.putSeconds(duration), format: this.getLastFormat()}, () => {
                this.putTag("spine", {}, () => {
                    l();
                });
            });
        });
        return this;
    }

    public putAsset(name: string, duration: number): fcpxmlBuilder {
        this.putTag("asset", {
            name,
            format: this.getLastFormat(),
            id: this.genID("asset"),
            duration: this.putSeconds(duration),
            start: this.putSeconds(0),
            hasAudio: this.putBool(this.conf.hasAudio),
            hasVideo: this.putBool(this.conf.hasVideo),
        }, () => this.putTag("media-rep", {
            src: name,
        }));
        return this;
    }

    public putClip(name: string, start: number, duration: number): fcpxmlBuilder {
        this.putTag("asset-clip", {
            name,
            ref: this.IDs.asset[this.IDs.asset.length - 1],
            offset: this.putSeconds(0),
            start: this.putSeconds(start),
            duration: this.putSeconds(duration),
        });

        return this;
    }

    private putSeconds(seconds: number): Second {return `${seconds}s`;}
    private putBool(b: boolean): string {return (+b).toString();}

    private genID(type: string): string {
        const id = `r${(this.IDs.asset.length + this.IDs.format.length + 1).toString()}`;
        this.IDs[type].push(id);
        return id;
    }
    private getLastFormat(): string {return this.IDs.format[this.IDs.format.length - 1].toString();}

    private readonly conf = {
        "version": "1.10",
        "hasAudio": true,
        "hasVideo": true
    } as const;
}
