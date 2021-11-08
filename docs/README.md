# JC-ProjectExportAPI Documentation

All information on how to use, fix and extend this project is (or will be) here.

## TOC
* [Getting started](#Getting-started)
* [Structure](#Structure)
* [Testing](#Testing)
* [Contribution](#Contribution)


## Getting started

### Dependencies
* [Node.js](https://nodejs.org/en/)
* [Yarn](https://yarnpkg.com/).
    * Installed with `npm i yarn -g`
Other dependencies will be fetched with yarn.

### Setup
* Clone the project **recursively** and **with ssh**
    * `git clone git@github.com:JumpCutter/JC-ProjectExportAPI --recursive`
* Setup
    * `yarn`
* Build
    * `yarn build`

### Overview
* A generator class exists for each exported format.
    * Each one located in their respective directories in [src](../src)
* All generators inherit from the abstract `Generator` class located in [src/baseGenerator.ts](../src/baseGenerator.ts)

## Structure
## Helper classes
* Each generator (except EDL) has a helper class `<format>Builder` which aims to remove any code not directly related to the structure of the exported file.
* Each builder has a different structure, but all have a public `data` member which contains the assembled file as a string

## EDL
* EDL is the only format created by an external library.
* External libraries are preferred if they exist.

## XML
* Both XML and FCPXML are created in a similar way.
* Both builders inherit from `baseXMLBUilder` located in [src/XML/common.ts](../src/XML/common.ts).
* This class defines a protected member function `putTag` used to define XML tags.

### `putTag`
* putTag creates XML tags in the `xmlBuilder` and `fcpxmlBuilder` classes.
* The function takes 2 or 3 arguments:
    1. Name of the tag as a `string`
    2. Object containing attributes. With keys of object being attribute names and values (`string`s) being attribute values.
        * Empty object `{}` can be used to specify no attributes.
    3. Last Argument can be one of `string`, `()=>void` or `undefined`
        * If the last argument is not specified, tag will become self closing.
        * If last argument is a string, it will be placed inside of the tag.
        * If the last argument is a function, one with no parameters and returning nothing, this function will be called inside of the tag.
            * `putTag` can be called again in that function to nest tags.
#### Examples
* All examples are valid XML but do not have any meaning in the context of Premiere Pro XML or FCPXML

[//]: # (The arrows are magic unicode stuff. Don't touch)

```ts
this.putTag("name", {});
/*          |
            V
         <name />
*/

this.putTag("name", {id: "42"});
/*          |
            V
      <name id=42 />
*/

this.putTag("name", {}, "TRACK_NAME");
/*          |
            V
  <name>TRACK_NAME</name>
*/

this.putTag("dimentions", {absolute: "true"}, () => {
    this.putTag("width", {}, "1920");
    this.putTag("height", {}, "1080");
});
/*          |
            V
  <dimentions absolute=true>
      <width>1920</width>
      <height>1080</height>
  </dimentions>
*/
```

## Testing
* There are tests, but not very good ones.
    * Currently only some tests check whether the generated file is valid,
      others simply pass if anything gets generated.
* Tests can be ran with `yarn test`
    * This does not require a prior `yarn build`
* You can import the files directly into an editor.
  They reference `yoga.mp4` test file stored in [JC-examples/](../JC-examples/).

## Contribution
* Contributions are welcome :)
* Both adding new formats and fixing existing ones.
* Simply fork this repo and create a pull request with any changes.
* Please use the provided `.eslintrc.yml` for formatting.

### Creating new formats
* Create a new directory for the new format
* Create a file named `gen<Format>.ts`.
* In this file create a class `<Format>` which inherits from `Generator`.
    * It should implement a `generate` member function which returns the created file as a string.
* Finally this class needs to be exposed in `src/index.d.ts` and in `src/index.ts`.

### Modifying existing implementation
* There should not be any breaking changes to the existing API.
* Some tests may fail due to the output file being changed. The PR will likely still get merged,
  but manual testing will be necessary.
