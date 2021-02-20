"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitTimeout = exports.wait = void 0;
function wait(ms) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), ms);
    });
}
exports.wait = wait;
async function waitTimeout(ms, func) {
    await wait(ms);
    return func();
}
exports.waitTimeout = waitTimeout;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FpdC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsibGliL3dhaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsU0FBZ0IsSUFBSSxDQUFDLEVBQVU7SUFDM0IsT0FBTyxJQUFJLE9BQU8sQ0FBTyxPQUFPLENBQUMsRUFBRTtRQUMvQixVQUFVLENBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBSkQsb0JBSUM7QUFFTSxLQUFLLFVBQVUsV0FBVyxDQUFJLEVBQVUsRUFBRSxJQUFhO0lBQzFELE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2YsT0FBTyxJQUFJLEVBQUUsQ0FBQztBQUNsQixDQUFDO0FBSEQsa0NBR0MifQ==