export type Json = {
    [key: string]: Primitives | Json | Json[]
}

export type Primitives = string | number | boolean;

export type CsvRow = {
    [k:string]: string | number | boolean
}