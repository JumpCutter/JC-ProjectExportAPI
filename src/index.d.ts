import * as Project from "./project";
export {Project};
export abstract class Generator{
    constructor(project: Project.Project)
    generate(): string;
}

export class ResolveEDL extends Generator{}
export class VegasEDL extends Generator{}
export class FCPXML extends Generator{}
export class XML extends Generator{}
