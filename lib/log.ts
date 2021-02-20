export function log(...toLog : any){
    if(!!toLog)
        toLog.forEach((e: any) => {if(!!e) console.log(e)})
    console.log("---")
}

export function error(...toLog : any){
    if(!!toLog)
        toLog.forEach((e: any) => {if(!!e) console.error(e)})
    console.error("---")
}