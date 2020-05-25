"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Failure = exports.Success = exports.Try = void 0;
var Try = /** @class */ (function () {
    function Try(val) {
        this._val = val;
    }
    Try.of = function (fn) {
        try {
            return new Success(fn());
        }
        catch (error) {
            return new Failure(error);
        }
    };
    Try.prototype.flatten = function () {
        return this._val;
    };
    Try.prototype.map = function (fn) {
        var _this = this;
        return Try.of(function () { return fn(_this._val); });
    };
    return Try;
}());
exports.Try = Try;
var Success = /** @class */ (function (_super) {
    __extends(Success, _super);
    function Success() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Success.prototype.getOrElse = function (anotherVal) {
        return this._val;
    };
    ;
    Success.prototype.getOrElseThrow = function () {
        return this._val;
    };
    return Success;
}(Try));
exports.Success = Success;
var Failure = /** @class */ (function (_super) {
    __extends(Failure, _super);
    function Failure() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Failure.prototype.map = function (fn) {
        return this;
    };
    Failure.prototype.getOrElse = function (anotherVal) {
        return anotherVal;
    };
    Failure.prototype.getOrElseThrow = function () {
        if (this._val !== null) {
            throw this._val;
        }
    };
    return Failure;
}(Try));
exports.Failure = Failure;
