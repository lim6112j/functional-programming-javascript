"use strict";
exports.__esModule = true;
exports.subscriber = exports.logl = exports.proLog = exports.log = void 0;
var util = require("util");
var log = (function () {
    return function (msg) {
        return function (v) {
            console.log(msg, " => ", v);
        };
    };
})();
exports.log = log;
var logl = (function () {
    return function (msg) {
        return function (v) {
            console.log(msg, " => ", util.inspect(v, true, 10, true));
        };
    };
})();
exports.logl = logl;
var proLog = (function () {
    return function (msg) {
        return function (v) {
            v.then(log(msg));
        };
    };
})();
exports.proLog = proLog;
var subscriber = function (f) { return function (end) {
    var i = 0;
    var obj = {
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
}; };
exports.subscriber = subscriber;
