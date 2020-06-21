"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.header = exports.assert = void 0;
exports.assert = (function () {
    return function (boolVal, msg) {
        const assert = document.getElementById("assert");
        let ele = null;
        ele = document.createElement('li');
        ele.innerHTML = msg;
        boolVal ? ele.className = 'true' : ele.className = 'false';
        assert ? assert.appendChild(ele) : null;
    };
})();
exports.header = (function () {
    return function (msg) {
        const assert = document.getElementById("assert");
        let ele = null;
        ele = document.createElement('h2');
        ele.innerHTML = msg;
        ele.className = 'header';
        assert ? assert.appendChild(ele) : null;
    };
})();
//# sourceMappingURL=util.js.map