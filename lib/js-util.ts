import * as crypto from 'crypto';
import * as fs from 'fs';
import entries = require('core-js/library/fn/object/entries');


/** Get sha256sum of the file path. */
export function get_sha256sum(path, cb: (error: any, result: string) => void) {
  const hash = crypto.createHash('sha256');
  const stream = fs.createReadStream(path);

  stream.on('error', error => cb(null, ''));
  stream.on('data', data => hash.update(data));
  stream.on('end', () => cb(null, hash.digest('hex')));
}

/** Generate a function to sort array objects by boolean property.
 * @param bool - `true` to sort by true values first or `false` to sort by false
 *                values first.
 * @param key - Object key.
 */
export function sort_obj_by(bool: boolean, key: string) {
  if (bool === true) return (x, y) => (x[key] === y[key])? 0 : x[key]? -1 : 1;
  else return (x, y) => (x[key] === y[key])? 0 : x[key]? 1 : -1;
}


/** Template filter to short string in the middle. E.g. 'message test' to 'mess...est' */
export function middle_short(input: string, {length = 15, separator = '...'}: {
          length?: number, separator?: string} = {}) {
  if (input.length <= length) return input;

  let sep_length = separator.length,
    charsToShow = length - sep_length,
    frontChars = Math.floor(charsToShow / 2),
    backChars = Math.ceil(charsToShow / 2);

  return input.substr(0, frontChars) + separator + input.substr(input.length - backChars);
}

/** Useful to simulate list comprehensions */
export function to_list(obj: Object, field: string) {
  const list = [];
  for (let item in obj) { list.push(obj[item][field]) }
  return list
}
