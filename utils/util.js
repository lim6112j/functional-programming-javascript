"use strict";
exports.__esModule = true;
exports.header = exports.assert = void 0;
exports.assert = (function () {
    return function (boolVal, msg) {
        var assert = document.getElementById("assert");
        var ele = null;
        ele = document.createElement('li');
        ele.innerHTML = msg;
        boolVal ? ele.className = 'true' : ele.className = 'false';
        assert ? assert.appendChild(ele) : null;
    };
})();
exports.header = (function () {
    return function (msg) {
        var assert = document.getElementById("assert");
        var ele = null;
        ele = document.createElement('h2');
        ele.innerHTML = msg;
        ele.className = 'header';
        assert ? assert.appendChild(ele) : null;
    };
})();
