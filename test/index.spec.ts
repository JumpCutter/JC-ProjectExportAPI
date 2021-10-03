import vegasEDL from "../src/vegasEDL/genVegasEDL";
import ResolevEdl from "../src/EDL/genEDL";
import FCPXML from "../src/FCPXML/genFCPXML";
import XML from "../src/XML/genXML";
import fs from "fs";
import path from "path";



let generators = {};


const project = JSON.parse(fs.readFileSync(path.join(__dirname, "./test.json")).toString());


describe("generating EDL for importing into DaVinci Resolve", () => {
  it("should create a generator object that takes project as an argument", () => {
    let tmp = project;
    generators["ResolveEDL"] = (new ResolevEdl(tmp));
  });
  it("generate a string representing a project in the EDL format", () => {
    fs.writeFileSync(path.join(__dirname, "./test.edl"), generators["ResolveEDL"].generate());
  });
});


describe("generating FCPXML for importing into FinalCut Pro", () => {
  it("should create a generator object that takes project as an argument", () => {
    let tmp = project;
    generators["FCPXML"] = (new FCPXML(tmp));
  });
  it("generate a string representing a project in the FCPXML format", () => {
    fs.writeFileSync(path.join(__dirname, "./test.fcpxml"), generators["FCPXML"].generate());
  });
});


describe("generating vegasEDL for importing into Sony Vegas Pro", () => {
  it("should create a generator object that takes project as an argument", () => {
    let tmp = project;
    generators["vegasEDL"] = (new vegasEDL(tmp));
  });
  it("generate a string representing a project in the EDL format Sony vegas supports", () => {
    fs.writeFileSync(path.join(__dirname, "./test.txt"), generators["vegasEDL"].generate());
  });
});

describe("generating XML for importing into Sony Vegas Pro", () => {
  it("should create a generator object that takes project as an argument", () => {
    let tmp = project;
    generators["XML"] = (new XML(tmp));
  });
  it("generate a string representing a project in the EDL format Sony vegas supports", () => {
    fs.writeFileSync(path.join(__dirname, "./test.xml"), generators["XML"].generate());
  });
});
