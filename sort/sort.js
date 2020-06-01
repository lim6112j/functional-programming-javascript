var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var quicksort = function (_a) {
    var head = _a[0], tail = _a.slice(1);
    return head === undefined ? [] : __spreadArrays(quicksort(__spreadArrays(tail.filter(function (a) { return a <= head; }))), [head], quicksort(__spreadArrays(tail.filter(function (a) { return a > head; }))));
};
console.log(quicksort([2, 4, 1, 7, 3]));
