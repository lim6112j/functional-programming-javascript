"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var quicksort = function (_a) {
    var head = _a[0], tail = _a.slice(1);
    return head === undefined ? [] : __spreadArrays(quicksort(__spreadArrays(tail.filter(function (a) { return a <= head; }))), [head], quicksort(__spreadArrays(tail.filter(function (a) { return a > head; }))));
};
console.log(quicksort([2, 4, 1, 7, 3]));
var mergeMap = function (arr) { return lodash_1.default(arr)
    .map(function (v) { return [v]; })
    .value(); };
console.log(mergeMap([4, 2, 1, 5]));
