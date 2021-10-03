import {Project, Layer, Cuts} from "./project";
export abstract class Generator {

    private project: Project;
    protected layer: Layer;
    protected cuts: Cuts;
    protected frameRate: number;
    protected clipName: string;

    constructor(project: Project) {
        this.project = project;
        this.layer = this.ensureSingleLayer(this.project);
        this.cuts = this.fillInGaps(this.ensureCuts(this.layer));
        this.frameRate = this.project.frameRate;
        this.clipName = this.layer.sourceFile;
    }


    private ensureSingleLayer(project: Project): Layer {
        const layers = project.layers;
        if (layers == null || layers == undefined) {
            throw new Error("No layers!!!");
        }
        if (layers[0] == null || layers[0] == undefined) {
            throw new Error("No layers inside of the layers!!!");
        }
        if (layers[0][0] == null || layers[0][0] == undefined) {
            throw new Error("No layers inside of the layers insode of the layers?!!!");
        }
        if (layers.length > 1 || layers[0].length > 1) {
            throw new Error("What do I do with this many layers?");
        }
        return layers[0][0];
    }

    private ensureCuts(layer: Layer): Cuts {
        if (layer.cuts == null || layer.cuts == undefined) {
            throw new Error("No cuts");
        }
        return layer.cuts;
    }

    private fillInGaps(cuts: Cuts): Cuts {
        const newCuts: Cuts = [];
        for (let i: number = 0; i < cuts.length; i++) {
            newCuts.push(cuts[i]);
            if (i + 1 < cuts.length) {
                newCuts.push({
                    start: cuts[i].end,
                    end: cuts[i + 1].start
                });
            }
        }
        return newCuts;
    }

    abstract generate(): string;
};
