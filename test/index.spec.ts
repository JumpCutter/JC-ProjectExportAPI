import * as PEAPI from "../src/index";
import fs from "fs";
import path from "path";



const project = JSON.parse(fs.readFileSync(path.join("JC-examples", "./yoga.json")).toString());

project["layers"][0][0]["sourceFile"] = "../JC-examples/yoga.mp4"

describe("generating vegasEDL for importing into Vegas Pro", () => {
    {
        let gen: PEAPI.VegasEDL;
        it("should create a generator object. Specifies project and that all parts of the clip need to be exported", () => {
            gen = new PEAPI.VegasEDL(project, {keepSilent: true});
        });
        it("generate a string representing a project in the EDL format Vegas supports", () => {
            fs.writeFileSync(path.join(__dirname, "./keep_silent_test.txt"), gen.generate());
        });
        it("should match the ground truth file", () => {
            let groundTruth = fs.readFileSync(path.join(__dirname, "./keep_silent_test.txt.gt"));
            let test = fs.readFileSync(path.join(__dirname, "./keep_silent_test.txt"));
            if(!groundTruth.equals(test)){
                throw new Error();
            }
        });
    }

{
    let gen: PEAPI.VegasEDL;
    it("should create a generator object. Specifies project and that only loud parts should be exported", () => {
        gen = new PEAPI.VegasEDL(project, {keepSilent: false});
    });
    it("generate a string representing a project in the EDL format Vegas supports", () => {
        fs.writeFileSync(path.join(__dirname, "./remove_silent_test.txt"), gen.generate());
    });
}

});

describe("generating EDL for importing into DaVinci Resolve", () => {
    {
        let gen: PEAPI.ResolveEDL;
        it("should create a generator object. Specifies project and that all parts of the clip need to be exported", () => {
            gen = new PEAPI.ResolveEDL(project, {keepSilent: true});
        });
        it("generate a string representing a project in the EDL format DaVinci Resoleve supports", () => {
            fs.writeFileSync(path.join(__dirname, "./keep_silent_test.edl"), gen.generate());
        });

        it("should match the ground truth file", () => {
            let groundTruth = fs.readFileSync(path.join(__dirname, "./keep_silent_test.edl.gt"));
            let test = fs.readFileSync(path.join(__dirname, "./keep_silent_test.edl"));
            if(!groundTruth.equals(test)){
                throw new Error();
            }
        });
    }

    {
        let gen: PEAPI.ResolveEDL;
        it("should create a generator object. Specifies project and that only loud parts should be exported", () => {
            gen = new PEAPI.ResolveEDL(project, {keepSilent: false});
        });
        it("generate a string representing a project in the EDL format DaVinci Resolve supports", () => {
            fs.writeFileSync(path.join(__dirname, "./remove_silent_test.edl"), gen.generate());
        });
    }
});


describe("generating FCPXML for importing into FinalCut Pro", () => {
    {
        let gen: PEAPI.FCPXML;
        it("should create a generator object. Specifies project and that all parts of the clip need to be exported", () => {
            gen = new PEAPI.FCPXML(project, {keepSilent: true});
        });
        it("generate a string representing a project in the FCPXML format", () => {
            fs.writeFileSync(path.join(__dirname, "./keep_silent_test.fcpxml"), gen.generate());
        });
    }

    {
        let gen: PEAPI.FCPXML;
        it("should create a generator object. Specifies project and that only loud parts should be exported", () => {
            gen = new PEAPI.FCPXML(project, {keepSilent: false});
        });
        it("generate a string representing a project in the FCPXML format", () => {
            fs.writeFileSync(path.join(__dirname, "./remove_silent_test.fcpxml"), gen.generate());
        });
    }
});



describe("generating XML for importing into Premiere Pro", () => {
    {
        let gen: PEAPI.XML;
        it("should create a generator object. Specifies project and that all parts of the clip need to be exported", () => {
            gen = new PEAPI.XML(project, {keepSilent: true});
        });
        it("generate a string representing a project in the XML format", () => {
            fs.writeFileSync(path.join(__dirname, "./keep_silent_test.xml"), gen.generate());
        });
    }

    {
        let gen: PEAPI.XML;
        it("should create a generator object. Specifies project and that only loud parts should be exported", () => {
            gen = new PEAPI.XML(project, {keepSilent: false});
        });
        it("generate a string representing a project in the XML format", () => {
            fs.writeFileSync(path.join(__dirname, "./remove_silent_test.xml"), gen.generate());
        });
    }
});
