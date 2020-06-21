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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const R = __importStar(require("ramda"));
const lodash_1 = __importDefault(require("lodash"));
const head = lodash_1.default.head;
const tail = lodash_1.default.tail;
const quicksort = ([head, ...tail]) => head === undefined ? [] :
    [...quicksort([...tail.filter(a => a <= head)]), head, ...quicksort([...tail.filter(a => a > head)])];
console.log(quicksort([2, 4, 1, 7, 3]));
const atomize = (arr) => lodash_1.default(arr)
    .map(v => [v])
    .value();
console.log(atomize([4, 2, 1, 5]));
const compare = (pL, pR) => {
    const p1 = pL.sort((a, b) => a - b);
    const p2 = pR.sort((a, b) => a - b);
    return p1.length === 0 && p2.length === 0 ? []
        : p1.length === 0 ? p2
            : p2.length === 0 ? p1
                : head(p1) <= head(p2) ? [head(p1), ...compare(tail(p1), p2)]
                    : [head(p2), ...compare(p1, tail(p2))];
};
const compare2 = R.curryN(2, compare);
console.log(compare([2, 1], [6, 0, 2]));
//# sourceMappingURL=sort.js.map