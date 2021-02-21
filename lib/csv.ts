import * as lib from "./lib";
import {CsvRow, Json, Primitives} from "./types";

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
export function toMap<T extends {}, L extends PropertyKey>(records : T[], keyName : L) : Map<PropertyKey, T> {
    const map = new Map();
    records.forEach((r : T) => {
        if(lib.hasOwnProperty(r,keyName))
            map.set(r[keyName], r);
        else
            throw "Object needs to Contain key!"
    });
    return map;
}

export function readCSV<T extends Json>(fileName: string): T[] {
    return csvParse(stripBom(fs.readFileSync(fileName, {encoding: 'UTF8'})), options);
}

export async function readCSVAsync<T extends Json>(fileName: string): Promise<T[]> {
    return csvParse(stripBom(await fs.readFile(fileName, {encoding: 'UTF8'})), options);
}

/**
 * Writes an Map of objets as a csv file. This function extracts the column names from the key of the first object. The Data is gathered from all Objects including the frist one.
 * @param inputMap Map of Objects.
 * @param path {@link writeCSV}
 * @param deleteCsvIfEmpty {@link writeCSV}
 */
export function writeCSVFromMap<T extends CsvRow>(inputMap: Map<any, Required<T>>, path: string, deleteCsvIfEmpty: boolean) {
    if (inputMap.size == 0 && !deleteCsvIfEmpty)
        throw "Input Map can not be empty for csv file export. You may turn deleteCsvIfEmpty on to get any already written file to be deleted."

    if (inputMap.size == 0)
        return writeCSV([], path, deleteCsvIfEmpty)

    //Write CSV
    const array = [...inputMap.values()];
    const header : string[] = Object.keys(array[0]);
    const dataArray : string[][] = array.map(record => Object.values(record));

    writeCSV([header].concat(dataArray), path, deleteCsvIfEmpty)
}

/**
 * Writes an array of objets as a csv file. This function extracts the column names from the key of the first object. The Data is gathered from all Objects including the frist one.
 * @param inputArray Array of Objects.
 * @param path {@link writeCSV}
 * @param deleteCsvIfEmpty {@link writeCSV}
 */
export function writeCSVFromArray<T extends CsvRow>(inputArray : Required<T>[], path : string, deleteCsvIfEmpty: boolean) {
    if(inputArray.length == 0 && !deleteCsvIfEmpty)
        throw "Input Array can not be empty for csv file export. You may turn deleteCsvIfEmpty on to get any already written file to be deleted."

    if(inputArray.length == 0)
        return writeCSV([], path, deleteCsvIfEmpty)

    const array = [Object.keys(inputArray[0])].concat(inputArray.map(record => Object.values(record)));
    writeCSV(array, path, deleteCsvIfEmpty);
}

/**
 * Writes an array of arrays / rows as a csv file.
 * @param inputArray Array of Rows. Please make sure, that all rows have the same amount of elements.
 * @param path Where to write the csv file?
 * @param deleteCsvIfEmpty Delete any existing csv file, if the provided array has a length of 0. Alternatively the function will throw an exception if you provide an empty inputArray.
 */
export function writeCSV(inputArray : Primitives[][], path : string, deleteCsvIfEmpty: boolean) {
    //Write CSV
    //console.log(inputArray.slice(0,3))

    if(inputArray.length == 0) {
        if(!deleteCsvIfEmpty){
            throw "Input Array can not be empty for csv file export. You may turn deleteCsvIfEmpty on to get any already written file to be deleted."
        } else {
            if(fs.existsSync(path)) {
                fs.unlinkSync(path);
                console.log('Deleted (Input Empty): ' + path);
            } else
                console.log('Not Written (Input Empty): ' + path);
            return;
        }
    }

    stringify(inputArray, {
        delimiter: ';',
        quoted_empty: true,
        quoted_string: true
    }, function (err:any, output:any) {
        fs.writeFile(path, output, function (err:any) {
            if (err) throw err;
            console.log('Saved: ' + path);
        });
    });
}

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
