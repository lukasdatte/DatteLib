import * as lib from "./lib";

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

export function readCSV(fileName: string): object[] {
    return csvParse(stripBom(fs.readFileSync(fileName, {encoding: 'UTF8'})), options);
}

export async function readCSVAsnc(fileName: string): Promise<object[]> {
    return csvParse(stripBom(await fs.readFile(fileName, {encoding: 'UTF8'})), options);
}

export function writeCSVFromMap(inputMap: Map<any, any>, path: string, deleteCsvIfEmpty: boolean) {
    if (inputMap.size == 0 && !deleteCsvIfEmpty)
        throw "Input Map can not be empty for csv file export. You may turn deleteCsvIfEmpty on to get any already written file to be deleted."

    if (inputMap.size == 0)
        return writeCSV([], path, deleteCsvIfEmpty)

    //Write CSV
    const header : string[] = Object.keys([...inputMap.values()][0]);
    const dataArray : string[][] = [...inputMap].map(record => Object.values(record[1]));

    writeCSVFromArray([header].concat(dataArray), path, deleteCsvIfEmpty)
}

export function writeCSVFromArray(inputArray : any[], path : string, deleteCsvIfEmpty: boolean) {
    if(inputArray.length == 0 && !deleteCsvIfEmpty)
        throw "Input Array can not be empty for csv file export. You may turn deleteCsvIfEmpty on to get any already written file to be deleted."

    if(inputArray.length == 0)
        return writeCSV([], path, deleteCsvIfEmpty)

    const array = [Object.keys(inputArray[0])].concat(inputArray.map(record => Object.values(record)));
    writeCSV(array, path, deleteCsvIfEmpty);
}

export function writeCSV(inputArray : any[], path : string, deleteCsvIfEmpty: boolean) {
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

module.exports = {}
module.exports.options = options;
module.exports.toMap = toMap;
module.exports.readCSV = readCSV;
module.exports.writeCSVFromMap = writeCSVFromMap;
module.exports.writeCSVFromArray = writeCSVFromArray;
