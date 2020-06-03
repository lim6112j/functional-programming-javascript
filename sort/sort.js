"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var R = __importStar(require("ramda"));
var lodash_1 = __importDefault(require("lodash"));
var head = lodash_1.default.head;
var tail = lodash_1.default.tail;
var quicksort = function (_a) {
    var head = _a[0], tail = _a.slice(1);
    return head === undefined ? [] : __spreadArrays(quicksort(__spreadArrays(tail.filter(function (a) { return a <= head; }))), [head], quicksort(__spreadArrays(tail.filter(function (a) { return a > head; }))));
};
console.log(quicksort([2, 4, 1, 7, 3]));
var atomize = function (arr) { return lodash_1.default(arr)
    .map(function (v) { return [v]; })
    .value(); };
console.log(atomize([4, 2, 1, 5]));
var compare = function (pL, pR) {
    var p1 = pL.sort(function (a, b) { return a - b; });
    var p2 = pR.sort(function (a, b) { return a - b; });
    return p1.length === 0 && p2.length === 0 ? []
        : p1.length === 0 ? p2
            : p2.length === 0 ? p1
                : head(p1) <= head(p2) ? __spreadArrays([head(p1)], compare(tail(p1), p2)) : __spreadArrays([head(p2)], compare(p1, tail(p2)));
};
var compare2 = R.curryN(2, compare);
console.log(compare([2, 1], [6, 0, 2]));
