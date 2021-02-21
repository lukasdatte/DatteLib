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
exports.writeCSV = exports.writeCSVFromArray = exports.writeCSVFromMap = exports.readCSVAsync = exports.readCSV = exports.toMap = void 0;
const lib = __importStar(require("./lib"));
const csvParse = require('csv-parse/lib/sync');
const stringify = require('csv-stringify');
const fs = require('fs');
const stripBom = require('strip-bom');
const options = {
    columns: true,
    skip_empty_lines: true,
    delimiter: ";"
};
/**
 *
 * @param records
 * @param keyName Schlüssel -> Optimalerweise die Artikelnummer
 * @return {Map<typeof r[L], T>}
 */
function toMap(records, keyName) {
    const map = new Map();
    records.forEach((r) => {
        if (lib.hasOwnProperty(r, keyName))
            map.set(r[keyName], r);
        else
            throw "Object needs to Contain key!";
    });
    return map;
}
exports.toMap = toMap;
function readCSV(fileName) {
    return csvParse(stripBom(fs.readFileSync(fileName, { encoding: 'UTF8' })), options);
}
exports.readCSV = readCSV;
async function readCSVAsync(fileName) {
    return csvParse(stripBom(await fs.readFile(fileName, { encoding: 'UTF8' })), options);
}
exports.readCSVAsync = readCSVAsync;
/**
 * Writes an Map of objets as a csv file. This function extracts the column names from the key of the first object. The Data is gathered from all Objects including the frist one.
 * @param inputMap Map of Objects.
 * @param path {@link writeCSV}
 * @param deleteCsvIfEmpty {@link writeCSV}
 */
function writeCSVFromMap(inputMap, path, deleteCsvIfEmpty) {
    if (inputMap.size == 0 && !deleteCsvIfEmpty)
        throw "Input Map can not be empty for csv file export. You may turn deleteCsvIfEmpty on to get any already written file to be deleted.";
    if (inputMap.size == 0)
        return writeCSV([], path, deleteCsvIfEmpty);
    //Write CSV
    const array = [...inputMap.values()];
    const header = Object.keys(array[0]);
    const dataArray = array.map(record => Object.values(record));
    writeCSV([header].concat(dataArray), path, deleteCsvIfEmpty);
}
exports.writeCSVFromMap = writeCSVFromMap;
/**
 * Writes an array of objets as a csv file. This function extracts the column names from the key of the first object. The Data is gathered from all Objects including the frist one.
 * @param inputArray Array of Objects.
 * @param path {@link writeCSV}
 * @param deleteCsvIfEmpty {@link writeCSV}
 */
function writeCSVFromArray(inputArray, path, deleteCsvIfEmpty) {
    if (inputArray.length == 0 && !deleteCsvIfEmpty)
        throw "Input Array can not be empty for csv file export. You may turn deleteCsvIfEmpty on to get any already written file to be deleted.";
    if (inputArray.length == 0)
        return writeCSV([], path, deleteCsvIfEmpty);
    const array = [Object.keys(inputArray[0])].concat(inputArray.map(record => Object.values(record)));
    writeCSV(array, path, deleteCsvIfEmpty);
}
exports.writeCSVFromArray = writeCSVFromArray;
/**
 * Writes an array of arrays / rows as a csv file.
 * @param inputArray Array of Rows. Please make sure, that all rows have the same amount of elements.
 * @param path Where to write the csv file?
 * @param deleteCsvIfEmpty Delete any existing csv file, if the provided array has a length of 0. Alternatively the function will throw an exception if you provide an empty inputArray.
 */
function writeCSV(inputArray, path, deleteCsvIfEmpty) {
    //Write CSV
    //console.log(inputArray.slice(0,3))
    if (inputArray.length == 0) {
        if (!deleteCsvIfEmpty) {
            throw "Input Array can not be empty for csv file export. You may turn deleteCsvIfEmpty on to get any already written file to be deleted.";
        }
        else {
            if (fs.existsSync(path)) {
                fs.unlinkSync(path);
                console.log('Deleted (Input Empty): ' + path);
            }
            else
                console.log('Not Written (Input Empty): ' + path);
            return;
        }
    }
    stringify(inputArray, {
        delimiter: ';',
        quoted_empty: true,
        quoted_string: true
    }, function (err, output) {
        fs.writeFile(path, output, function (err) {
            if (err)
                throw err;
            console.log('Saved: ' + path);
        });
    });
}
exports.writeCSV = writeCSV;
/*
type Complete<T> = {
    [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>> ? T[P] : (T[P] | undefined);
}

writeCSVFromArray([["x"],["d"],["d", "d"]],"", false)
writeCSVFromArray([{s: "s"},{s: "s"}],"", false)
writeCSVFromArray([{y: "s"},{s: "k"}],"", false)

module.exports = {}
module.exports.options = options;
module.exports.toMap = toMap;
module.exports.readCSV = readCSV;
module.exports.writeCSVFromMap = writeCSVFromMap;
module.exports.writeCSVFromArray = writeCSVFromArray;
*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3N2LmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJsaWIvY3N2LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBNkI7QUFHN0IsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDL0MsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQzNDLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QixNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFFdEMsTUFBTSxPQUFPLEdBQUc7SUFDWixPQUFPLEVBQUUsSUFBSTtJQUNiLGdCQUFnQixFQUFFLElBQUk7SUFDdEIsU0FBUyxFQUFFLEdBQUc7Q0FDakIsQ0FBQztBQUVGOzs7OztHQUtHO0FBQ0gsU0FBZ0IsS0FBSyxDQUFzQyxPQUFhLEVBQUUsT0FBVztJQUNqRixNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFLLEVBQUUsRUFBRTtRQUN0QixJQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFDLE9BQU8sQ0FBQztZQUM1QixHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7WUFFdkIsTUFBTSw4QkFBOEIsQ0FBQTtJQUM1QyxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQVRELHNCQVNDO0FBRUQsU0FBZ0IsT0FBTyxDQUFpQixRQUFnQjtJQUNwRCxPQUFPLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBQyxRQUFRLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3RG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