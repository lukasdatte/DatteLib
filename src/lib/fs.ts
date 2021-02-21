import * as path from "path";
import * as fs from "fs";

/**
 * Diese Funktion stellt sicher, dass es einen Ordner gibt. Entweder den Elternordner einer Datei oder einen kompletten Ordnerpfad.
 * Bei ./ordner1/ordner2/ wird ordner1 erstellt aber ordner 2 nicht.
 * Bei ./ordner1/ordner2/dateiname.endung wird ordner1 und ordner2 erstellt.
 *
 * Wenn {@code isDict} @code true} ist, wird auch dateiname.endung als Ordner erstellt.
 * @param filePath Dateipfad!
 * @param isDict {@code Standard = false} : soll der letzte Teil des Pfads als Ordner und nicht als Datei angesehen werden und entsprechend erstellt werden?
 */
export function ensureDirectoryExistence(filePath : string, isDict = false) {
    const dirname = isDict ? filePath : path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(isDict ? path.dirname(dirname) : dirname , isDict);
    fs.mkdirSync(dirname);
}

