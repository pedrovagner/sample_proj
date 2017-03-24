import * as fs from 'fs';


/** Check whether given path is directory.
 * @param path - File path to check. */
export function isDirSync(path: string): boolean {
  try {
    return fs.statSync(path).isDirectory();
  } catch (e) {
    return false;
  }
}
