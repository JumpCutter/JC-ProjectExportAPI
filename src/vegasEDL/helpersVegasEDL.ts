export class vegasEDLBuilder {
    private readonly header: string = "\"ID\";\"Track\";\"StartTime\";\"Length\";\"PlayRate\";\"Locked\";\"Normalized\";\"StretchMethod\";\"Looped\";\"OnRuler\";\"MediaType\";\"FileName\";\"Stream\";\"StreamStart\";\"StreamLength\"; \"FadeTimeIn\";\"FadeTimeOut\";\"SustainGain\";\"CurveIn\";\"GainIn\";\"CurveOut\";\"GainOut\";\"Layer\";\"Color\";\"CurveInR\";\"CurveOutR\";\"PlayPitch\";\"LockPitch\"";

    private _data: string[] = [this.header];

    private _temp: string[] = [];

    // context for building individual events (I miss python)
    public buildContextManager(l: () => void) {
        this._temp = [];
        l();
        this._data.push(this._temp.join(';'));
    }

    public putStartBuild(): vegasEDLBuilder {
        this._temp = [];
        return this;
    }
    public putID(id: number): vegasEDLBuilder {
        this._temp.push(this.putNumber(id));
        return this;
    }

    public putTrack(track: number): vegasEDLBuilder {
        this._temp.push(track.toString());
        return this;
    }

    public putStartTime(startTime: number): vegasEDLBuilder {
        this._temp.push(this.putMillis(startTime));
        return this;
    }

    public putLength(length: number): vegasEDLBuilder {
        this._temp.push(this.putMillis(length));
        return this;
    }

    public putPlayRate(playRate: number = this.conf.playRate): vegasEDLBuilder {
        this._temp.push(this.putPreciseNumber(playRate));
        return this;
    }

    public putLocked(locked: boolean = this.conf.locked): vegasEDLBuilder {
        this._temp.push(this.putBool(locked));
        return this;
    }

    public putNormalised(normalised: boolean = this.conf.normalized): vegasEDLBuilder {
        this._temp.push(this.putBool(normalised));
        return this;
    }

    public putStretchMethod(stretchMethod: number = this.conf.stretchMethod): vegasEDLBuilder {
        this._temp.push(this.putNumber(stretchMethod));
        return this;
    }

    public putLooped(looped: boolean = this.conf.looped): vegasEDLBuilder {
        this._temp.push(this.putBool(looped));
        return this;
    }

    public putOnRuler(onRuler: boolean = this.conf.onRuler): vegasEDLBuilder {
        this._temp.push(this.putBool(onRuler));
        return this;
    }

    public putMediaType(mediaType: typeof this.mediaTypes[number]): vegasEDLBuilder {
        this._temp.push(mediaType);
        return this;
    }

    public putFileName(fileName: string): vegasEDLBuilder {
        this._temp.push(fileName);
        return this;
    }

    public putStream(stream: number = this.conf.stream): vegasEDLBuilder {
        this._temp.push(this.putNumber(stream));
        return this;
    }

    public putStreamStart(streamStart: number): vegasEDLBuilder {
        this._temp.push(this.putMillis(streamStart));
        return this;
    }

    public putStreamLength(streamLength: number): vegasEDLBuilder {
        this._temp.push(this.putMillis(streamLength));
        return this;
    }

    public putFadeTimeIn(fadeTimeIn: number = this.conf.fadeTimeIn): vegasEDLBuilder {
        this._temp.push(this.putPreciseNumber(fadeTimeIn));
        return this;
    }

    public putFadeTimeOut(fadeTimeOut: number = this.conf.fadeTimeOut): vegasEDLBuilder {
        this._temp.push(this.putPreciseNumber(fadeTimeOut));
        return this;
    }

    public putSustainGain(sustainGain: number = this.conf.sustainGain): vegasEDLBuilder {
        this._temp.push(this.putPreciseNumber(sustainGain));
        return this;
    }

    public putCurveIn(curveIn: number = this.conf.curveIn): vegasEDLBuilder {
        this._temp.push(this.putNumber(curveIn));
        return this;
    }

    public putGainIn(gainIn: number = this.conf.gainIn): vegasEDLBuilder {
        this._temp.push(this.putPreciseNumber(gainIn));
        return this;
    }

    public putCurveOut(curveOut: number = this.conf.curveOut): vegasEDLBuilder {
        this._temp.push(this.putNumber(curveOut));
        return this;
    }

    public putGainOut(gainOut: number = this.conf.gainOut): vegasEDLBuilder {
        this._temp.push(this.putPreciseNumber(gainOut));
        return this;
    }

    public putLayer(layer: number = this.conf.layer): vegasEDLBuilder {
        this._temp.push(this.putNumber(layer));
        return this;
    }

    public putColor(color: number = this.conf.color): vegasEDLBuilder {
        this._temp.push(this.putNumber(color));
        return this;
    }

    public putCurveInR(curveInR: number = this.conf.curveInR): vegasEDLBuilder {
        this._temp.push(this.putNumber(curveInR));
        return this;
    }

    public putCurveOutR(curveOutR: number = this.conf.curveOutR): vegasEDLBuilder {
        this._temp.push(this.putNumber(curveOutR));
        return this;
    }

    public putPlayPitch(playPitch: number = this.conf.playPitch): vegasEDLBuilder {
        this._temp.push(this.putPreciseNumber(playPitch));
        return this;
    }

    public putLockPitch(lockPitch: boolean = this.conf.lockPitch): vegasEDLBuilder {
        this._temp.push(this.putBool(lockPitch));
        return this;
    }


    // WARNING: if any of these values are specified manually, this function cannot be used
    public putFirstDefualts(): vegasEDLBuilder {
        return this.putPlayRate()
            .putLocked()
            .putNormalised()
            .putStretchMethod()
            .putLooped()
            .putOnRuler();
    }

    // WARNING: if any of these values are specified manually, this function cannot be used
    public putSecondDefualts(): vegasEDLBuilder {
        return this.putFadeTimeIn()
            .putFadeTimeOut()
            .putSustainGain()
            .putCurveIn()
            .putGainIn()
            .putCurveOut()
            .putGainOut()
            .putLayer()
            .putColor()
            .putCurveInR()
            .putCurveOutR()
            .putPlayPitch()
            .putLockPitch();
    }

    get data() {
        return this._data.join('\n');
    }

    // booleans are expoected to be uppercase
    private putBool(b: boolean): string {
        return b.toString().toUpperCase();
    }

    private putPreciseNumber(n: number): string {
        // Looks like some numbers are expected to be floats and 6 is a good number
        return n.toFixed(6);
    }

    private putNumber(n: number) {
        return n.toString();
    }

    private putMillis(n: number): string {
        // 10 is very preise, but still well within the limits of a 64 bit float
        return (n * 1000).toFixed(10);
    }


    private readonly conf = {
        playRate: 1,
        locked: false,
        normalized: false,
        stretchMethod: 0,
        looped: false,
        onRuler: false,
        stream: 0,
        fadeTimeIn: 0,
        fadeTimeOut: 0,
        sustainGain: 1,
        curveIn: 4,
        gainIn: 0,
        curveOut: 4,
        gainOut: 0,
        layer: 0,
        color: -1,
        curveInR: 4,
        curveOutR: 4,
        playPitch: 0,
        lockPitch: false,
    } as const;

    public readonly mediaTypes = ["VIDEO", "AUDIO"] as const;
}
