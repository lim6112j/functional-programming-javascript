import * as R from 'ramda';
import _ from 'lodash';
import { Tuple } from './tuple'
// lodash :: array or object -> array or object -> ...
// Ramda :: A -> B -> C -> A -> ...

// trim :: String -> String
const trim = (str) => str.replace(/^\s*|\s$/g, '');
// normalize :: String -> String
const normalize = (str) => str.replace(/\-/g, '');

console.log(normalize(trim(' 444-444-444 ')))

// using tuple for minimize params
//isValid :: String -> (Boolean, String), no tuple
//isValid :: String -> Status,  with tuple, useful when use pipeline.
const Status = Tuple(Boolean, String);
const isValid = (str) => !str || !trim(str) ? new Status(false, 'invalid string') :
  new Status(true, 'valid string');
console.log(isValid('sdfsdf'))
console.log(isValid(''))

