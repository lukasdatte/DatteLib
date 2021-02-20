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
exports.ensureDirectoryExistence = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
/**
 * Diese Funktion stellt sicher, dass es einen Ordner gibt. Entweder den Elternordner einer Datei oder einen kompletten Ordnerpfad.
 * Bei ./ordner1/ordner2/ wird ordner1 erstellt aber ordner 2 nicht.
 * Bei ./ordner1/ordner2/dateiname.endung wird ordner1 und ordner2 erstellt.
 *
 * Wenn {@code isDict} @code true} ist, wird auch dateiname.endung als Ordner erstellt.
 * @param filePath Dateipfad!
 * @param isDict {@code Standard = false} : soll der letzte Teil des Pfads als Ordner und nicht als Datei angesehen werden und entsprechend erstellt werden?
 */
function ensureDirectoryExistence(filePath, isDict = false) {
    const dirname = isDict ? filePath : path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(isDict ? path.dirname(dirname) : dirname, isDict);
    fs.mkdirSync(dirname);
}
exports.ensureDirectoryExistence = ensureDirectoryExistence;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnMuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbImxpYi9mcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQTZCO0FBQzdCLHVDQUF5QjtBQUV6Qjs7Ozs7Ozs7R0FRRztBQUNILFNBQWdCLHdCQUF3QixDQUFDLFFBQWlCLEVBQUUsTUFBTSxHQUFHLEtBQUs7SUFDdEUsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDM0QsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3hCLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFDRCx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRyxNQUFNLENBQUMsQ0FBQztJQUM1RSxFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUFQRCw0REFPQyJ9