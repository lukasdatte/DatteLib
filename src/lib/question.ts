import * as readlineSync from "readline-sync";
import {waitTimeout} from "./wait";
import * as _ from "lodash";

type QustionResultGenerator<T> = (userInput: string) => T;

/**
 * Asks a user to enter a value until a valid input is revieved. Use the inputChecker RegExp to controll the user input.
 * @param question
 * @param inputChecker
 * @param resultGenerator
 * @param options
 */
export function askQuestion<T = boolean>(question : string, inputChecker : RegExp | ((response: string) => boolean), resultGenerator : QustionResultGenerator<T>, options? : readlineSync.BasicOptions) : T {
    let notAnswered = true;
    const checker = inputChecker instanceof RegExp ? (response: string) => response.match(inputChecker) : inputChecker;
    while (true) {
        let response = readlineSync.question(question, options).toLowerCase();
        notAnswered = !checker(response);
        if(!notAnswered){
            return resultGenerator(response);
        }
    }
}

/**
 *
 * @param question
 * @param options readlineSync.BasicOptions oder defaultInput
 */
export function askQuestionYN<T = boolean>(question : string, options? : readlineSync.BasicOptions | String) : boolean {
    if(!options || _.isString(options))
        options = {
            limit: /[jny]/i,
            defaultInput: !!options ? options : "y"
        }

    // @ts-ignore
    return askQuestion(question, /^[jyn]$/, userInput => userInput == "y" || userInput == "j", options);
}


//readlineSync.question seems to block stdoutput. Wait to to allow otherwise blocked output to be shown before the question has been answered by the user.
export async function askQuestionYnWait<T = boolean>(question : string, options? : readlineSync.BasicOptions) : Promise<boolean> {
    return await waitTimeout(100, () => askQuestionYN(question, options));
}