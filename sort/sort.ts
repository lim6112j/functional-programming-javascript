import * as R from "ramda";
import _ from "lodash";
const head = _.head;
const tail = _.tail;
const quicksort = ([head, ...tail]: any[]): any =>
  head === undefined
    ? []
    : [
        ...quicksort([...tail.filter((a) => a <= head)]),
        head,
        ...quicksort([...tail.filter((a) => a > head)]),
      ];

console.log(quicksort([2, 4, 1, 7, 3]));

const atomize = (arr: any[]) =>
  _(arr)
    .map((v) => [v])
    .value();
console.log(atomize([4, 2, 1, 5]));
const compare = (pL: any[], pR: any[]): any[] => {
  const p1 = pL.sort((a, b) => a - b);
  const p2 = pR.sort((a, b) => a - b);
  return p1.length === 0 && p2.length === 0
    ? []
    : p1.length === 0
    ? p2
    : p2.length === 0
    ? p1
    : head(p1) <= head(p2)
    ? [head(p1), ...compare(tail(p1), p2)]
    : [head(p2), ...compare(p1, tail(p2))];
};

const compare2 = R.curryN(2, compare);
console.log(compare([2, 1], [6, 0, 2]));
