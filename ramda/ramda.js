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

// lift
var madd3a = R.curry((a,b,c) => a + b + c);
var madd3 = R.lift(R.curry((a,b,c) => a + b+ c));
var madd3N = R.liftN(3, R.curryN(3, (...args) => R.sum(args)))
console.log(madd3a([1,2,3], [1,2,3], [1]))
console.log(madd3([1,2,3], [1,2,3], [1]))
console.log(madd3N([1,2,3], [1,2,3], [1]))