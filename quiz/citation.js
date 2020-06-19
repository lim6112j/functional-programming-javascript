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
var hIndex = function (citations) {
    var len = citations.length;
    var hh = function (h) {
        if (h < 0)
            return 0;
        return (citations[h] === citations.slice(h).length) ? citations.slice(h).length : hh(h - 1);
    };
    return hh(len - 1);
};
console.log(hIndex([0]));
console.log(hIndex([1]));
console.log(hIndex([100]));
console.log(hIndex([0, 0]));
console.log(hIndex([0, 1])); // should 1
console.log(hIndex([0, 2])); // should 1
console.log(hIndex([0, 1, 3, 5, 6]));
