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
exports.askQuestionYnWait = exports.askQuestionYN = exports.askQuestion = void 0;
const readlineSync = __importStar(require("readline-sync"));
const wait_1 = require("./wait");
const _ = __importStar(require("lodash"));
/**
 * Asks a user to enter a value until a valid input is revieved. Use the inputChecker RegExp to controll the user input.
 * @param question
 * @param inputChecker
 * @param resultGenerator
 * @param options
 */
function askQuestion(question, inputChecker, resultGenerator, options) {
    let notAnswered = true;
    const checker = inputChecker instanceof RegExp ? (response) => response.match(inputChecker) : inputChecker;
    while (true) {
        let response = readlineSync.question(question, options).toLowerCase();
        notAnswered = !checker(response);
        if (!notAnswered) {
            return resultGenerator(response);
        }
    }
}
exports.askQuestion = askQuestion;
/**
 *
 * @param question
 * @param options readlineSync.BasicOptions oder defaultInput
 */
function askQuestionYN(question, options) {
    if (!options || _.isString(options))
        options = {
            limit: /[jny]/i,
            defaultInput: !!options ? options : "y"
        };
    // @ts-ignore
    return askQuestion(question, /^[jyn]$/, userInput => userInput == "y" || userInput == "j", options);
}
exports.askQuestionYN = askQuestionYN;
//readlineSync.question seems to block stdoutput. Wait to to allow otherwise blocked output to be shown before the question has been answered by the user.
async function askQuestionYnWait(question, options) {
    return await wait_1.waitTimeout(100, () => askQuestionYN(question, options));
}
exports.askQuestionYnWait = askQuestionYnWait;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24uanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbImxpYi9xdWVzdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNERBQThDO0FBQzlDLGlDQUFtQztBQUNuQywwQ0FBNEI7QUFJNUI7Ozs7OztHQU1HO0FBQ0gsU0FBZ0IsV0FBVyxDQUFjLFFBQWlCLEVBQUUsWUFBdUQsRUFBRSxlQUEyQyxFQUFFLE9BQW9DO0lBQ2xNLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQztJQUN2QixNQUFNLE9BQU8sR0FBRyxZQUFZLFlBQVksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQWdCLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQztJQUNuSCxPQUFPLElBQUksRUFBRTtRQUNULElBQUksUUFBUSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3RFLFdBQVcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqQyxJQUFHLENBQUMsV0FBVyxFQUFDO1lBQ1osT0FBTyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDcEM7S0FDSjtBQUNMLENBQUM7QUFWRCxrQ0FVQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixhQUFhLENBQWMsUUFBaUIsRUFBRSxPQUE2QztJQUN2RyxJQUFHLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBQzlCLE9BQU8sR0FBRztZQUNOLEtBQUssRUFBRSxRQUFRO1lBQ2YsWUFBWSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRztTQUMxQyxDQUFBO0lBRUwsYUFBYTtJQUNiLE9BQU8sV0FBVyxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLElBQUksR0FBRyxJQUFJLFNBQVMsSUFBSSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDeEcsQ0FBQztBQVRELHNDQVNDO0FBR0QsMEpBQTBKO0FBQ25KLEtBQUssVUFBVSxpQkFBaUIsQ0FBYyxRQUFpQixFQUFFLE9BQW9DO0lBQ3hHLE9BQU8sTUFBTSxrQkFBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDMUUsQ0FBQztBQUZELDhDQUVDIn0=