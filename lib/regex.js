"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wörterRegex = exports.returnMatchOrThrow = void 0;
const escape_string_regexp_1 = __importDefault(require("escape-string-regexp"));
function returnMatchOrThrow(string, matcher) {
    const match = string.match(matcher);
    if (!match)
        throw `string could not be matched ${string} - ${matcher.toString()}`;
    return match;
}
exports.returnMatchOrThrow = returnMatchOrThrow;
function wörterRegex(wörter) {
    return "(?<=\\s|^)(" + wörter.map(word => escape_string_regexp_1.default(word) + "\\s*").join("|") + ")" +
        "(?=\\s|$)\\s*";
}
exports.wörterRegex = wörterRegex;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnZXguanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbImxpYi9yZWdleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxnRkFBc0Q7QUFFdEQsU0FBZ0Isa0JBQWtCLENBQUMsTUFBZSxFQUFFLE9BQWdCO0lBQ2hFLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEMsSUFBRyxDQUFDLEtBQUs7UUFDTCxNQUFNLCtCQUErQixNQUFNLE1BQU0sT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUE7SUFDekUsT0FBTyxLQUFLLENBQUE7QUFDaEIsQ0FBQztBQUxELGdEQUtDO0FBRUQsU0FBZ0IsV0FBVyxDQUFDLE1BQWlCO0lBQ3pDLE9BQU8sYUFBYSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyw4QkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRSxNQUFNLENBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRztRQUN4RixlQUFlLENBQUM7QUFDeEIsQ0FBQztBQUhELGtDQUdDIn0=