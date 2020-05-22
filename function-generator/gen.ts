/**
 * How To Run
 * tsc --downlevelIteration -w ./function-generator/gen.ts
 */
function* range(start=0, finish=Number.POSITIVE_INFINITY) {
  for(let i = start; i < finish; i++){
    yield i;
  }
}
// const num = range(1);
// console.log(num.next().value);
// console.log(num.next().value);
// console.log(num.next().value);

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
function take (amount: Number, generator: any): Number[] {
  let result = [];
  for(let n of generator) {
    result.push(n);
    if(n === amount) {
      break;
    }
  }
  return result;
}

console.log(take(3, range(1, Infinity)))