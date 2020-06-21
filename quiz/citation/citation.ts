/**
 * @param {number[]} citations set to be of ascending order
 * @return {number}
 * [0] => 0
 * [1] => 1
 * [100] => 1
 * [0, 1] => 1
 * [0, 2] => 1
 * [0, 1, 3, 5, 6] => 3
 */
import { assert, header } from '../../utils/util';
var ascendOrd = function (list: number[]): number[] {
  return list.sort((a, b) => a -b)
}
var hIndex = function(citations: number[]):number {
    const len = citations.length
    let asd = ascendOrd(citations);
    const recursive = (i: number = 0): number => {
      if(i === len) return 0
      return citations[i] >= len  - i ? len  - i : recursive(i+1)
    }
    /**
     * 
     * @param s start index
     * @param e end index
     * @param acc accumulator
     * [0, 1]
     * mid = 0 + 1 / 2 = 0
     * 
     * python non-recursive code
     *     n=len(c)
    l,r=0,n-1
    
    while l<=r:
        mid=(l+r)//2
        
        if c[mid]<n-mid:
            l=mid+1
        else:
            r=mid-1
    return n-l
     */
    const binary = (s: number = 0, e: number = len -1 ): number => {
      const mid = Math.floor((s+e)/2)
      return s > e ? len -s 
              : citations[mid] < len - mid ? binary(mid + 1, e)
              : citations[mid] >= len - mid ? binary(s, mid - 1)
              : Math.min(citations[mid], len-mid)
    }
    // return recursive()
    return binary()
};
console.time('hindex')
console.log(hIndex([0])) // should 0
console.log(hIndex([1])) // should 1
console.log(hIndex([100])) // should 1
console.log(hIndex([0, 0])) // should 0
console.log(hIndex([0, 1])) // should 1
console.log(hIndex([0, 2])) // should 1
console.log(hIndex([11, 15])) // should 2
console.log(hIndex([0, 1, 3 ,5,6])) // should 3
console.log(hIndex([3,0,6,1,5])) // should 3
console.log(hIndex([7,7,7,7,7,7,7])) // should 7
console.log(hIndex([1, 4, 7, 9])) // should 3
console.timeEnd('hindex')

// test
header("hIndex test starting")
assert(hIndex([0])===0, "index([0]) should 0")
assert(hIndex([1]) === 1, "index([1]) should 1")
assert(hIndex([100])=== 1, "hIndex([100]) should 1")
assert(hIndex([0,0])===0, "hIndex([0,0]) should 0")
assert(hIndex([0,1])===1, "hIndex([0,1]) should 1")
assert(hIndex([0, 2])===1, "hIndex([0, 2]) should 1")
assert(hIndex([11, 15])===2, "hIndex([11, 15]) should 2")
assert(hIndex([0, 1, 3 ,5,6])===3, "[0, 1, 3 ,5,6]) should 3")
assert(hIndex([3,0,6,1,5])===3, "hIndex([3,0,6,1,5]) should 3")
assert(hIndex([7,7,7,7,7,7,7])===7, "hIndex([7,7,7,7,7,7,7]) should 7")
assert(hIndex([1, 4, 7, 9])===3, "hIndex([1, 4, 7, 9]) should 3")