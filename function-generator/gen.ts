/**
 * How To Run
 * tsc --downlevelIteration -w ./function-generator/gen.ts
 * npm start ./function-generator/gen
 */
function* range(start=0, finish=Number.POSITIVE_INFINITY) {
  for(let i = start; i < finish; i++){
    yield i;
  }
}
function rawRange(start: number, finish = Number.POSITIVE_INFINITY) {
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      if(start < finish) {
        return { value: start++ , done: false};
      }
      return { done: true, value: finish };
    }
  }
}
// const num = range(1);
// console.log(num.next().value);
// console.log(num.next().value);
// console.log(num.next().value);
// const num = rawRange(1);
// console.log(num.next().value);
// console.log(num.next().value);
// console.log(num.next().value);
for(let x of rawRange(1, 3)) {
  console.log(x)
}
/**
 * generator as iterator
 */
// function* iterator() {
//   yield 1
//   yield 2
//   yield 3
// }
// for(let x of iterator()) {
//   console.log(x)
// }

/**
 * take function
 */
// function take (amount: Number, generator: any): Number[] {
//   let result = [];
//   for(let n of generator) {
//     result.push(n);
//     if(n === amount) {
//       break;
//     }
//   }
//   return result;
// }

// console.log(take(3, range(1, Infinity)))

// secrets of ninja chapter 6
import { assert, header } from '../utils/util';

header('Chapter 6 - exercise');

function *EvenGenerator() {
  let num = 2;
  while(true) {
    yield num;
    num = num + 2;
  }
}
let generator = EvenGenerator();
let a1 = generator.next().value;
let a2 = generator.next().value;
let a3 = EvenGenerator().next().value;
let a4 = generator.next().value;

assert(a1 === 2, "a1 === 2");
assert(a2 === 4, "a2 === 4");
assert(a3 === 2, "a3 === 2");
assert(a4 === 6, "a4 === 6");