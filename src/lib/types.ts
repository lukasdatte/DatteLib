export type Json<T> = {
    [key in keyof T]: Primitives | Json<T[key]> | Json<T[key]>[]
}

export type Primitives = string | number | boolean;

//Stelle sicher, dass alle Zeilen nur strings, numbers oder booleans enthalten.
export type CsvRow<T> = {
    [k in keyof T]: string | number | boolean
}

export function getTypedKeys<T>(obj: T): [keyof T] {
    return Object.keys(obj) as [keyof typeof obj];
}