"use strict";
/**
 * The set [1,2,3,...,n] contains a total of n! unique permutations.

By listing and labeling all of the permutations in order, we get the following sequence for n = 3:

"123"
"132"
"213"
"231"
"312"
"321"
Given n and k, return the kth permutation sequence.

Note:

Given n will be between 1 and 9 inclusive.
Given k will be between 1 and n! inclusive.
Example 1:

Input: n = 3, k = 3
Output: "213"

Example 2:
Input: n = 4, k = 9
1234
1243 // reversed 43 so index 1 will be changed
1324 // index 1 will change 2 + 1, remaining 2,4 asc order
1342 // 1, 3 asc,  => 4,2 reversed
1423 //  4,2 reversed => 3 should change to 4
1432 // 1,4 asc, 2,3 asc => 3,2 reversed
2134 // 4,3,2 reversed => 1 should 1 + 1, remains asc order
2143
2314

Output: "2314"
 */
function getPermutationHeap(num, k) {
    let list = new Array(num);
    const output = [];
    for (let i = 0; i < list.length; i++) {
        list[i] = i + 1;
    }
    const swap = (arrToSwap, idxA, idxB) => {
        const temp = arrToSwap[idxA];
        arrToSwap[idxA] = arrToSwap[idxB];
        arrToSwap[idxB] = temp;
    };
    const permuteHeap = (n, heapArr) => {
        if (n === 1) {
            output.push(heapArr.slice());
            return;
        }
        permuteHeap(n - 1, heapArr);
        for (let i = 0; i < n - 1; i++) {
            if (n % 2 === 0) {
                swap(heapArr, i, n - 1);
            }
            else {
                swap(heapArr, 0, n - 1);
            }
            permuteHeap(n - 1, heapArr);
        }
    };
    permuteHeap(num, list.slice());
    return output;
}
;
function getPermutationLexical(n, k) {
    const original = new Array(n);
    const output = [];
    for (let i = 0; i < original.length; i++) {
        original[i] = i + 1;
    }
    // console.log(original)
    const swap = (arrToSwap, idxA, idxB) => {
        const temp = arrToSwap[idxA];
        arrToSwap[idxA] = arrToSwap[idxB];
        arrToSwap[idxB] = temp;
    };
    const compare = (arrToCompare, idxA, idxB) => {
        return arrToCompare[idxA] - arrToCompare[idxB];
    };
    const findCeil = (arr, first, begin, end) => {
        let ceilIndex = begin;
        for (let i = begin + 1; i <= end; i++) {
            if (arr[i] > first && arr[i] < arr[ceilIndex]) {
                ceilIndex = i;
            }
        }
        return ceilIndex;
    };
    const quicksort = ([head, ...tail]) => head === undefined ? [] :
        [...quicksort([...tail.filter(a => a <= head)]), head, ...quicksort([...tail.filter(a => a > head)])];
    const permute = (__arr = original, __idx = k) => {
        const len = __arr.length;
        let arr = __arr.slice();
        let isFinished = false;
        let output = [];
        while (!isFinished) {
            let i = 0;
            output.push(arr.slice());
            for (let idx = len - 2; idx >= -1; idx--) {
                i = idx;
                if (arr[idx] < arr[idx + 1]) {
                    break;
                }
            }
            if (i === -1) {
                isFinished = true;
            }
            else {
                const ceilIndex = findCeil(arr, arr[i], i + 1, len - 1);
                // console.log(i, ceilIndex)
                swap(arr, i, ceilIndex);
                arr = arr.slice(0, i + 1).concat(quicksort(arr.slice(i + 1)));
            }
        }
        return output;
    };
    return permute(original)[k - 1] ? permute(original)[k - 1].toString().replace(/,/g, "") : "";
}
// console.time('permutation')
// console.log(getPermutationHeap(3,3))
// console.timeEnd('permutation')
console.time('permutation');
console.log(getPermutationLexical(9, 199269));
console.timeEnd('permutation');
//# sourceMappingURL=permutation-sequence.js.map