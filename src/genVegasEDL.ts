import {Generator} from "./baseGenerator";
import {Cuts, Project, Layer, } from "./project";


export class vegasEDL extends Generator {

  // the main thing
  generate() {
    let out: string[] = [this.header];
    this.mediaTypes.forEach((mtype, i) => {
      this.cuts!.forEach((cut, j) => {
        //       |ID            |Track |StartTime   |Length
        out.push(`${i + (i * j)};  ${i};${cut.start};${cut.end - cut.start};`);

        //       |PlayRate             |Locked             |Normalized             |StretchMethod             |
        out.push(`${this.conf.playRate};${this.conf.locked};${this.conf.normalized};${this.conf.stretchMethod};`);

        //       |Looped             |OnRuler            |MediaType| FileName                 |
        out.push(`${this.conf.looped};${this.conf.locked};${mtype} ;${this.fileName};`);

        //       |Stream             |StreamStart |StreamLength          | FadeTimeIn            |
        out.push(`${this.conf.stream};${cut.start};${cut.end - cut.start};${this.conf.fadeTimeIn};`);

        //       |FadeTimeOut             |SustainGain             |CurveIn             |GainIn             |
        out.push(`${this.conf.fadeTimeOut};${this.conf.sustainGain};${this.conf.curveIn};${this.conf.gainIn};`);

        //       |CurveOut             |GainOut             |Layer             |Color             |
        out.push(`${this.conf.curveOut};${this.conf.gainOut};${this.conf.layer};${this.conf.color};`);

        //       |CurveInR             |CurveOutR             |PlayPitch             |LockPitch             |
        out.push(`${this.conf.curveInR};${this.conf.curveOutR};${this.conf.playPitch};${this.conf.lockPitch};\n`);
      })

    });
    return out.join("");
  }


  // Implementation details

  constructor(project: Project) {
    super(project);

    const layer: Layer = this.ensureSingleLayer();

    this.cuts = this.ensureCuts(layer);
    this.fileName = layer.sourceFile;
  }



  private cuts: Cuts;
  private fileName: string;

  private putBool(b: boolean): string {
    return b.toString().toUpperCase();
  }

  private readonly conf = {
    playRate: 1.000000.toFixed(6),
    locked: this.putBool(false),
    normalized: this.putBool(false),
    stretchMethod: 0..toString(),
    looped: this.putBool(false),
    onRuler: this.putBool(false),
    stream: 0..toString(),
    fadeTimeIn: 0.000000.toFixed(6),
    fadeTimeOut: 0.000000.toFixed(6),
    sustainGain: 1.000000.toFixed(6),
    curveIn: 4..toString(),
    gainIn: 0.000000.toFixed(6),
    curveOut: 4..toString(),
    gainOut: 0.000000.toFixed(6),
    layer: 0..toString(),
    color: -1..toString(),
    curveInR: 4..toString(),
    curveOutR: 4..toString(),
    playPitch: 0.000000.toFixed(6),
    lockPitch: this.putBool(false),
  };

  private readonly header: string = "\"ID\";\"Track\";\"StartTime\";\"Length\";\"PlayRate\";\"Locked\";\"Normalized\";\"StretchMethod\";\"Looped\";\"OnRuler\";\"MediaType\";\"FileName\";\"Stream\";\"StreamStart\";\"StreamLength\"; \"FadeTimeIn\";\"FadeTimeOut\";\"SustainGain\";\"CurveIn\";\"GainIn\";\"CurveOut\";\"GainOut\";\"Layer\";\"Color\";\"CurveInR\";\"CurveOutR\";\"PlayPitch\";\"LockPitch\"\n"
  private readonly mediaTypes: string[] = ["VIDEO", "AUDIO"];
}

