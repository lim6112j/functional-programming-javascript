"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Failure = exports.Success = exports.Try = void 0;
class Try {
    constructor(val) {
        this._val = val;
    }
    static of(fn) {
        try {
            return new Success(fn());
        }
        catch (error) {
            return new Failure(error);
        }
    }
    flatten() {
        return this._val;
    }
    map(fn) {
        return Try.of(() => fn(this._val));
    }
}
exports.Try = Try;
class Success extends Try {
    getOrElse(anotherVal) {
        return this._val;
    }
    ;
    getOrElseThrow() {
        return this._val;
    }
}
exports.Success = Success;
class Failure extends Try {
    map(fn) {
        return this;
    }
    getOrElse(anotherVal) {
        return anotherVal;
    }
    getOrElseThrow() {
        if (this._val !== null) {
            throw this._val;
        }
    }
}
exports.Failure = Failure;
//# sourceMappingURL=index.js.map