"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsFile = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
//import Ajv from "ajv";
//const tsj = require("ts-to-json");
//const ajv = new Ajv({useDefaults: true})
//TODO see Json-Schema
class SettingsFile {
    constructor(filePath, skeletonGenerator, checker) {
        const { dir, base, name, ext } = path.parse(filePath);
        if (base === name)
            throw "Filename not valid" + "\nPath: " + filePath;
        if (ext !== ".json")
            throw "File extention must be .json: " + ext + "\nPath: " + filePath;
        if (!fs.existsSync(dir))
            throw "Folder not existing" + "\nPath: " + filePath;
        let data = fs.existsSync(filePath) ? checker(JSON.parse(fs.readFileSync(filePath, "utf-8"))) : skeletonGenerator();
        if (!data)
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
exports.SettingsFile = SettingsFile;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3NGaWxlLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJsaWIvc2V0dGluZ3NGaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBNkI7QUFDN0IsdUNBQXlCO0FBQ3pCLHdCQUF3QjtBQUN4QixvQ0FBb0M7QUFDcEMsMENBQTBDO0FBRTFDLHNCQUFzQjtBQUN0QixNQUFhLFlBQVk7SUFJckIsWUFBWSxRQUFnQixFQUFFLGlCQUEwQixFQUFFLE9BQThCO1FBQ3BGLE1BQU0sRUFBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ25ELElBQUksSUFBSSxLQUFLLElBQUk7WUFDYixNQUFNLG9CQUFvQixHQUFHLFVBQVUsR0FBRyxRQUFRLENBQUE7UUFDdEQsSUFBSSxHQUFHLEtBQUssT0FBTztZQUNmLE1BQU0sZ0NBQWdDLEdBQUcsR0FBRyxHQUFHLFVBQVUsR0FBRyxRQUFRLENBQUE7UUFFeEUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDO1lBQ25CLE1BQU0scUJBQXFCLEdBQUcsVUFBVSxHQUFHLFFBQVEsQ0FBQTtRQUV2RCxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDbkgsSUFBRyxDQUFDLElBQUk7WUFDSixJQUFJLEdBQUcsaUJBQWlCLEVBQUUsQ0FBQztRQUUvQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUM3QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7d0hBYW9IO0lBRXBILFVBQVU7UUFDTixFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7Q0FDSjtBQXhDRCxvQ0F3Q0M7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBaUJnQyJ9