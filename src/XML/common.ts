export class baseXMLBUilder {
    protected _data: string[] = [];

    protected putTag(name: string, attr: {[key: string]: string},
        contents?: () => void) {
        const attrStr =
            Object.entries(attr)
                .map(([key, value]) => {return `${key}="${value}"`;})
                .join(' ');

        if (!contents) {
            this._data.push(`<${name} ${attrStr}/>`);
            return;
        }

        this._data.push(`<${name} ${attrStr}>`);
        contents();
        this._data.push(`</${name}>`);
    }

    public get data() {
        return this._data.join('\n');
    }
}
