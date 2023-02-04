export function myPartial() {
  /*
  fn :: (a, b, c) => d
  partial :: (fn, a, _, c) => ffn(a, x, c)
  ffn :: x => d
  */
  let tempBoundArgs = Array.prototype.slice.call(arguments);
  let fn = tempBoundArgs[0];
  let boundArgs = tempBoundArgs.slice(1);
  // console.log(tempBoundArgs[1])
  let placeholder = "_";
  let length = boundArgs.length;
  let args = Array(length);

  let bound = function () {
    console.log("arguments length => ", length);
    let position = 0;
    for (let i = 0; i < length; i++) {
      args[i] =
        boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
    }
    while (position < arguments.length) {
      args.push(arguments[position++]);
    }
    console.log("args length => ", args.length);
    return fn.apply(this, args);
  };
  return bound;
}
