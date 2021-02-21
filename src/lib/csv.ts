import * as lib from "./lib";
import {CsvRow, Json, Primitives} from "./types";
import _ from "lodash";

import csvParse from "csv-parse/lib/sync";
import parse from "csv-parse";

import stringify from "csv-stringify";

const fs = require('fs');
const stripBom = require('strip-bom');
const windows1252 = require('windows-1252');

export const defaultParseOptions = {
    columns: true,
    skip_empty_lines: true,
    delimiter: ";"
};

export const defaultWriteOptions = {
    delimiter: ';',
    quoted_empty: true,
    quoted_string: true
};

export type CsvEncoding = 'utf8' | 'windows1252';

/**
 * Return a {@link parse.Options} Object based on user provided settings and the default settings.
 * User Settings overwrite the default ones.
 */
function getReadOptions(options? : parse.Options) {
    const defaultO = _.cloneDeep(defaultParseOptions);
    return !!options ? Object.assign(defaultO, options) : options;
}

/**
 * Return a {@link parse.Options} Object based on user provided settings and the default settings.
 * User Settings overwrite the default ones.
 */
function getWriteOptions(options? : parse.Options) {
    const defaultO = _.cloneDeep(defaultParseOptions);
    return !!options ? Object.assign(defaultO, options) : options;
}

/**
 * Create a map from an array of Objects. The key is taken from the objects based on the provided keyname.
 * @param records
 * @param keyName Schlüssel -> Optimalerweise die Artikelnummer
 * @return {Map<typeof r[L], T>}
 */
export function toMap<T extends {L: K}, L extends PropertyKey, K>(records : T[], keyName : L) : Map<PropertyKey, T> {
    const map = new Map();
    records.forEach((r : T) => {
        if(lib.hasOwnProperty(r,keyName))
            map.set(r[keyName], r);
        else
            throw "Object needs to Contain key!"
    });
    return map;
}


/**
 * Read a CSV file and return an array of objects. The Key Names a taken from the first line of the CSV.<br/>
 * Test
 * @param fileName
 * @param encoding
 * @param options {parse.Options} Options used to parse the CSV file. Provided keys override the default ones.<br/>
 * {@link parse.Options}, {@link defaultParseOptions}<br/>
 *
 */
export function readCSV<T extends Json, P extends parse.Options>(fileName: string, encoding: CsvEncoding = "utf8", options? : P & parse.Options):
    P extends { columns: false } ? Primitives[][] : T[]
{
    const options2 = getReadOptions(options);
    if(!encoding || encoding == 'utf8')
        return csvParse(stripBom(fs.readFileSync(fileName, {encoding: 'UTF8'})), options2);
    if(encoding == 'windows1252')
        return csvParse(windows1252.decode(fs.readFileSync(fileName).toString('binary'), {mode: 'fatal'}), options2);
    throw "Illegal encoding: " + encoding
}

/*let c = readCSV("")
let c2 = readCSV("", "utf8", {columns: false})
let c3 = readCSV("", "utf8", {columns: true})
let c4 = readCSV("", "utf8", {})*/

/**
 * @deprecated
 * @param fileName
 * @param options
 */
export async function readCSVAsync<T extends Json>(fileName: string, options? : parse.Options): Promise<T[]> {
    return csvParse(stripBom(await fs.readFile(fileName, {encoding: 'UTF8'})), getReadOptions(options));
}

/**
 * Writes a Map of objets to a csv file. This function extracts the column names from the key of the first object. The Data is gathered from all Objects including the frist one.
 * @param inputMap Map of Objects.
 * @param path {@link writeCSV}
 * @param deleteCsvIfEmpty {@link writeCSV}
 */
export function writeCSVFromMap<T extends CsvRow>(inputMap: Map<any, Required<T>>, path: string, deleteCsvIfEmpty: boolean, encoding?: CsvEncoding) {
    if (inputMap.size == 0 && !deleteCsvIfEmpty)
        throw "Input Map can not be empty for csv file export. You may turn deleteCsvIfEmpty on to get any already written file to be deleted."

    if (inputMap.size == 0)
        return writeCSV([], path, deleteCsvIfEmpty, encoding)

    //Write CSV
    const array = [...inputMap.values()];
    const header : string[] = Object.keys(array[0]);
    const dataArray : string[][] = array.map(record => Object.values(record));

    writeCSV([header].concat(dataArray), path, deleteCsvIfEmpty, encoding)
}

/**
 * Writes an array of objets as a csv file. This function extracts the column names from the key of the first object. The Data is gathered from all Objects including the frist one.
 * @param inputArray Array of Objects.
 * @param path {@link writeCSV}
 * @param deleteCsvIfEmpty {@link writeCSV}
 */
export function writeCSVFromArray<T extends CsvRow>(inputArray : Required<T>[], path : string, deleteCsvIfEmpty: boolean, encoding?: CsvEncoding) {
    if(inputArray.length == 0 && !deleteCsvIfEmpty)
        throw "Input Array can not be empty for csv file export. You may turn deleteCsvIfEmpty on to get any already written file to be deleted."

    if(inputArray.length == 0)
        return writeCSV([], path, deleteCsvIfEmpty, encoding)

    const array = [Object.keys(inputArray[0])].concat(inputArray.map(record => Object.values(record)));
    writeCSV(array, path, deleteCsvIfEmpty, encoding);
}

/**
 * Writes an array of arrays / rows as a csv file.
 * @param inputArray Array of Rows. Please make sure, that all rows have the same amount of elements.
 * @param path Where to write the csv file?
 * @param deleteCsvIfEmpty Delete any existing csv file, if the provided array has a length of 0. Alternatively the function will throw an exception if you provide an empty inputArray.
 * @param encoding
 */
export async function writeCSV(inputArray: Primitives[][], path: string, deleteCsvIfEmpty: boolean, encoding?: CsvEncoding) {
    return new Promise<void>((resolve, reject) => {
        //Write CSV
        //console.log(inputArray.slice(0,3))

        if (inputArray.length == 0) {
            if (!deleteCsvIfEmpty) {
                throw "Input Array can not be empty for csv file export. You may turn deleteCsvIfEmpty on to get any already written file to be deleted."
            } else {
                if (fs.existsSync(path)) {
                    fs.unlinkSync(path);
                    console.log('Deleted (Input Empty): ' + path);
                } else
                    console.log('Not Written (Input Empty): ' + path);
                return;
            }
        }

        stringify(inputArray, defaultWriteOptions, function (err, output: string | Buffer) {
            if(encoding == 'windows1252')
                output = windows1252.encode(output)

            fs.writeFile(path, output, {encoding: encoding == 'windows1252' ? 'binary' : 'utf8'},
                function (err: any) {
                    if(!!err) {
                        reject(err);
                    } else {
                        console.log('Saved: ' + path);
                        resolve()
                    }
                });
        });

    })
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
