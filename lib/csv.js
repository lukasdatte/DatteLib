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
exports.writeCSV = exports.writeCSVFromArray = exports.writeCSVFromMap = exports.readCSVAsnc = exports.readCSV = exports.toMap = void 0;
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
async function readCSVAsnc(fileName) {
    return csvParse(stripBom(await fs.readFile(fileName, { encoding: 'UTF8' })), options);
}
exports.readCSVAsnc = readCSVAsnc;
function writeCSVFromMap(inputMap, path, deleteCsvIfEmpty) {
    if (inputMap.size == 0 && !deleteCsvIfEmpty)
        throw "Input Map can not be empty for csv file export. You may turn deleteCsvIfEmpty on to get any already written file to be deleted.";
    if (inputMap.size == 0)
        return writeCSV([], path, deleteCsvIfEmpty);
    //Write CSV
    const header = Object.keys([...inputMap.values()][0]);
    const dataArray = [...inputMap].map(record => Object.values(record[1]));
    writeCSVFromArray([header].concat(dataArray), path, deleteCsvIfEmpty);
}
exports.writeCSVFromMap = writeCSVFromMap;
function writeCSVFromArray(inputArray, path, deleteCsvIfEmpty) {
    if (inputArray.length == 0 && !deleteCsvIfEmpty)
        throw "Input Array can not be empty for csv file export. You may turn deleteCsvIfEmpty on to get any already written file to be deleted.";
    if (inputArray.length == 0)
        return writeCSV([], path, deleteCsvIfEmpty);
    const array = [Object.keys(inputArray[0])].concat(inputArray.map(record => Object.values(record)));
    writeCSV(array, path, deleteCsvIfEmpty);
}
exports.writeCSVFromArray = writeCSVFromArray;
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
module.exports = {};
module.exports.options = options;
module.exports.toMap = toMap;
module.exports.readCSV = readCSV;
module.exports.writeCSVFromMap = writeCSVFromMap;
module.exports.writeCSVFromArray = writeCSVFromArray;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3N2LmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJsaWIvY3N2LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBNkI7QUFFN0IsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDL0MsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQzNDLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QixNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFFdEMsTUFBTSxPQUFPLEdBQUc7SUFDWixPQUFPLEVBQUUsSUFBSTtJQUNiLGdCQUFnQixFQUFFLElBQUk7SUFDdEIsU0FBUyxFQUFFLEdBQUc7Q0FDakIsQ0FBQztBQUVGOzs7OztHQUtHO0FBQ0gsU0FBZ0IsS0FBSyxDQUFzQyxPQUFhLEVBQUUsT0FBVztJQUNqRixNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFLLEVBQUUsRUFBRTtRQUN0QixJQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFDLE9BQU8sQ0FBQztZQUM1QixHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7WUFFdkIsTUFBTSw4QkFBOEIsQ0FBQTtJQUM1QyxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQVRELHNCQVNDO0FBRUQsU0FBZ0IsT0FBTyxDQUFDLFFBQWdCO0lBQ3BDLE9BQU8sUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDdEYs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