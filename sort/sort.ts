const quicksort = ([head, ...tail]) => head === undefined ? [] : 
  [...quicksort([...tail.filter(a => a <= head)]), head, ...quicksort([...tail.filter(a => a > head)])];

console.log(quicksort([2,4,1,7,3]))