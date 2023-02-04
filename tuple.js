import * as R from "ramda";

export const Tuple = function () {
  const typeInfo = Array.prototype.slice.call(arguments);
  const checkType = R.curry((typeDef, obj) => {
    if (!R.is(typeDef, obj)) {
      let type = typeof obj;
      throw new TypeError(
        `형식 불일치 [${typeDef}]이어야 하는데, [${type}]입니다.`
      );
    }
    return obj;
  });
  const _T = function () {
    const values = Array.prototype.slice.call(arguments);
    if (values.some((val) => val === null || val === undefined)) {
      throw new ReferenceError("tuple should not contain null");
    }
    if (values.length !== typeInfo.length) {
      throw new TypeError("not matced with prototype arguments");
    }
    values.forEach((val, index) => {
      this["_" + (index + 1)] = checkType(typeInfo[index])(val);
    }, this);
    Object.freeze(this);
  };

  _T.prototype.values = () => {
    return Object.keys(this).map((k) => this[k], this);
  };
  return _T;
};
