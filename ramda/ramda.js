import * as R from 'ramda';
import {Maybe} from 'crocks';
/**
 * R.lift
 */
var add = R.add;
console.log(add(3,5));

var addM = R.lift(R.add);
console.log(addM(Maybe.Just(3), Maybe.Just(5))); //=> Maybe.Just(8);

console.log(addM([3], [5]));