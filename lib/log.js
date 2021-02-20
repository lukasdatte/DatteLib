"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.log = void 0;
function log(...toLog) {
    if (!!toLog)
        toLog.forEach((e) => { if (!!e)
            console.log(e); });
    console.log("---");
}
exports.log = log;
function error(...toLog) {
    if (!!toLog)
        toLog.forEach((e) => { if (!!e)
            console.error(e); });
    console.error("---");
}
exports.error = error;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJsaWIvbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLFNBQWdCLEdBQUcsQ0FBQyxHQUFHLEtBQVc7SUFDOUIsSUFBRyxDQUFDLENBQUMsS0FBSztRQUNOLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFFLElBQUcsQ0FBQyxDQUFDLENBQUM7WUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUE7SUFDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUN0QixDQUFDO0FBSkQsa0JBSUM7QUFFRCxTQUFnQixLQUFLLENBQUMsR0FBRyxLQUFXO0lBQ2hDLElBQUcsQ0FBQyxDQUFDLEtBQUs7UUFDTixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsR0FBRSxJQUFHLENBQUMsQ0FBQyxDQUFDO1lBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFBO0lBQ3pELE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDeEIsQ0FBQztBQUpELHNCQUlDIn0=