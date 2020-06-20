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
var ascendOrd = function (list) {
    return list.sort(function (a, b) { return a - b; });
};
var hIndex = function (citations) {
    var len = citations.length;
    var asd = ascendOrd(citations);
    var hh = function (i) {
        if (i === len)
            return 0;
        return citations[i] >= len - i ? len - i : hh(i + 1);
    };
    return hh(0);
};
console.log(hIndex([0])); // should 0
console.log(hIndex([1])); // should 1
console.log(hIndex([100])); // should 1
console.log(hIndex([0, 0])); // should 0
console.log(hIndex([0, 1])); // should 1
console.log(hIndex([0, 2])); // should 1
console.log(hIndex([11, 15])); // should 2
console.log(hIndex([0, 1, 3, 5, 6])); // should 3
console.log(hIndex([3, 0, 6, 1, 5])); // should 3
console.log(hIndex([7, 7, 7, 7, 7, 7, 7])); // should 7
console.log(hIndex([1, 4, 7, 9])); // should 3
