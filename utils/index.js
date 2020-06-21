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
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriber = exports.logl = exports.proLog = exports.log = void 0;
const util = __importStar(require("util"));
const log = (function () {
    return function (msg) {
        return function (v) {
            console.log(msg, " => ", v);
        };
    };
})();
exports.log = log;
const logl = (function () {
    return function (msg) {
        return function (v) {
            console.log(msg, " => ", util.inspect(v, true, 10, true));
        };
    };
})();
exports.logl = logl;
const proLog = (function () {
    return function (msg) {
        return function (v) {
            v.then(log(msg));
        };
    };
})();
exports.proLog = proLog;
const subscriber = (f) => function (end) {
    let i = 0;
    const obj = {
        next: function (v) {
            log('Subscription value')(v);
            if (f)
                f();
            i++ === end ? this.unsubscribe() : null;
        },
        error: log('Subscription Error'),
        complete: function () { if (f)
            f(); log('completed')(this); }
    };
    return obj;
};
exports.subscriber = subscriber;
//# sourceMappingURL=index.js.map