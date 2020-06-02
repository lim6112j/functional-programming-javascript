import _ from 'lodash';
const quicksort = ([head, ...tail]: any[]):any => head === undefined ? [] : 
  [...quicksort([...tail.filter(a => a <= head)]), head, ...quicksort([...tail.filter(a => a > head)])];

console.log(quicksort([2,4,1,7,3]))

const mergeMap = (arr: any[]) => _(arr)
.map(v => [v])
.value()
console.log(mergeMap([4,2,1,5]))