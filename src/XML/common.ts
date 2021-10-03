export class baseXMLBUilder {
    protected _data: string[] = [];

    protected putTag(name: string, attr: {[key: string]: string},
        contents?: (() => void) | string) {
        const attrStr =
            Object.entries(attr)
                .map(([key, value]) => {return `${key}="${value}"`;})
                .join(' ');

        if (!contents) {
            this._data.push(`<${name} ${attrStr}/>`);
            return;
        }

        this._data.push(`<${name} ${attrStr}>`);
        if (typeof contents === "function") {
            contents();
            this._data.push(`</${name}>`);
        } else {
            const tmp: string[] = [contents, `</${name}>`];
            this._data[this._data.length - 1] += tmp.join("");
        }
    }

    public get data() {
        return this._data.join('\n');
    }
}
