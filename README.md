# Project Export API
This repo contains various generators for external project

## Currently supported:
* EDL:
    * cmx3600 version of the format
    * Supported by DaVinci Resolve
* VegasEDL
    * Sony Vegas' proprietary standard, coincidentally also called EDL.
* FCPXML
    * Supported by Final Cut Pro ≥10.4.9
* XML
    * supported by Premiere pro and Final Cut Pro 7

## Running
### Dependencies
* node
* yarn
### Setup
* Clone the project **recursively** and **with ssh**
    * `git clone git@github.com:JumpCutter/JC-ProjectExportAPI --recursive`
* Install yarn if you don't have it
    * `npm i yarn -g`
* Build
    * `yarn build`
### Tests
* Run tests (this does not require `yarn build`
    * `yarn test`

## Testing
* There are tests, but not very good ones.
    * Currently tests only check whether the generators run, not what they produce
* A proper test would be to generate the file for the appropriate editor,
  make sure the file is properly imported, then compare all future changes to that file.

