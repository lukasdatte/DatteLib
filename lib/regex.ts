import escapeStringRegexp from "escape-string-regexp";

export function returnMatchOrThrow(string : string, matcher : RegExp){
    const match = string.match(matcher);
    if(!match)
        throw `string could not be matched ${string} - ${matcher.toString()}`
    return match
}

export function wörterRegex(wörter : string[]){
    return "(?<=\\s|^)(" + wörter.map(word => escapeStringRegexp(word)+ "\\s*" ).join("|") + ")" +
        "(?=\\s|$)\\s*";
}

