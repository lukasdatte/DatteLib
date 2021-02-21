import * as path from "path";
import * as fs from "fs";
//import Ajv from "ajv";
//const tsj = require("ts-to-json");
//const ajv = new Ajv({useDefaults: true})

//TODO see Json-Schema
export class SettingsFile<T> {
    public readonly filePath: string;
    public readonly data: T;

    constructor(filePath: string, skeletonGenerator: () => T, checker: (json: T) => T | null) {
        const {dir, base, name, ext} = path.parse(filePath)
        if (base === name)
            throw "Filename not valid" + "\nPath: " + filePath
        if (ext !== ".json")
            throw "File extention must be .json: " + ext + "\nPath: " + filePath

        if (!fs.existsSync(dir))
            throw "Folder not existing" + "\nPath: " + filePath

        let data = fs.existsSync(filePath) ? checker(JSON.parse(fs.readFileSync(filePath, "utf-8"))) : skeletonGenerator();
        if(!data)
            data = skeletonGenerator();

        this.data = data;
        this.filePath = filePath;
    }

    /*const config /!*: tsj.Config*!/ = {
            path: "./lib/settingsFileDef.ts",
            tsconfig: "../tsconfig.json",
            type: "*", // Or <type-name> if you want to generate schema for that one type only
            expose: "export",
            jsDoc: "extended",
            topRef: true,
        };

        const schema = tsj.createGenerator(config).createSchema(config.type);
        const schemaString = JSON.stringify(schema);

        const validate = ajv.compile(schema)
        const data : T = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, "utf-8")) : skeletonCreator();*/

    updateFile() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
    }
}

/*
let settingsFile = new SettingsFile<{bla: string}>("./settings/test.json", {bla: "treteer"}, (data) => {
    if(!_.isString(data.bla))
        return null;
    return data;
})
console.log(settingsFile.data)
settingsFile = new SettingsFile<{bla: string}>("./settings/test.json", {bla: "treteer"}, (data) => {
    if(!_.isString(data.bla)){
        if(_.isNumber(data.bla))
            data.bla = String(data.bla)
        else
            return null;
    }
    return data;
})
settingsFile.updateFile()
console.log(settingsFile.data)*/
