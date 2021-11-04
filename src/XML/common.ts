export class baseXMLBUilder {
    protected _data: string[] = [];
    private tab: string = "    ";
    private indent: number = 0;

    protected putTag(name: string, attr: {[key: string]: string},
        contents?: (() => void) | string) {
        const attrStr = (() => {
            const a = Object.entries(attr)
                .map(([key, value]) => {return `${key}="${value}"`;})
                .join(' ');
            return a ? " " + a : "";
        })();

        if (!contents) {
            this._data.push(`${this.tab.repeat(this.indent)}<${name}${attrStr} />`);
            return;
        }

        this._data.push(`${this.tab.repeat(this.indent)}<${name}${attrStr}>`);
        if (typeof contents === "function") {
            this.indent++;
            contents();
            this.indent--
            this._data.push(`${this.tab.repeat(this.indent)}</${name}>`);
        } else {
            this._data[this._data.length - 1] += `${contents}</${name}>`;
        }
    }

    public get data() {
        return this._data.join('\n');
    }
}
