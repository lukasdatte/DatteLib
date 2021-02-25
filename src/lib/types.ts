export type Json = {
    [key: string]: Primitives | Json | Json[]
}

export type Primitives = string | number | boolean;

export type CsvRow = {
    [k:string]: string | number | boolean
}

export function getTypedKeys<T>(obj: T): [keyof T] {
    return Object.keys(obj) as [keyof typeof obj];
}