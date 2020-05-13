const log = (msg) => (v) => console.log(msg ,' => ', v)
const syncWait = ms => {
  const end = Date.now() + ms
  while (Date.now() < end) continue
}
function expensiveFunc(a, memoized) {
  expensiveFunc.cache = expensiveFunc.cache || {};
  if(expensiveFunc.cache.a && memoized) {
    return expensiveFunc.cache.a;
  }
  syncWait(3000)
  return expensiveFunc.cache.a = a * 34
}
console.log('Started ....')
const call1 = expensiveFunc(5, true);
log('call1')(call1)
const call2 = expensiveFunc(5, true);
log('call2')(call2)
const call3 = expensiveFunc(5, true);
log('call3')(call3)

function memoized(fn) {
  return function() {
    var args = Array.prototype.slice.call(arguments);
    console.log(args)
    fn.cache = fn.cache || {}
    console.log(JSON.stringify(fn.cache))
    return fn.cache[args] ? fn.cache[args] : (fn.cache[args] = fn.apply(this, args))
  }
}

log('memoized func')(memoized(expensiveFunc)(6, false))
log('memoized func')(memoized(expensiveFunc)(6, false))
log('memoized func')(memoized(expensiveFunc)(6, false))
const arr = [1,2,3];
const obj = {};
obj[arr] = 4;
console.log(JSON.stringify(obj))