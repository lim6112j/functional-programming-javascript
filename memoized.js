import _ from 'lodash'
const log = (msg) => (v) => console.log(msg ,' => ', v)
// const syncWait = ms => {
//   const end = Date.now() + ms
//   while (Date.now() < end) continue
// }
// function expensiveFunc(a, memoized) {
//   expensiveFunc.cache = expensiveFunc.cache || {};
//   if(expensiveFunc.cache.a && memoized) {
//     return expensiveFunc.cache.a;
//   }
//   syncWait(3000)
//   return expensiveFunc.cache.a = a * 34
// }
// console.log('Started ....')
// const call1 = expensiveFunc(5, true);
// log('call1')(call1)
// const call2 = expensiveFunc(5, true);
// log('call2')(call2)
// const call3 = expensiveFunc(5, true);
// log('call3')(call3)

// function memoized (fn) {
//   return function() {
//     var args = Array.prototype.slice.call(arguments);
//     console.log(args)
//     fn.cache = fn.cache || {}
//     console.log(JSON.stringify(fn.cache))
//     return fn.cache[args] ? fn.cache[args] : (fn.cache[args] = fn.apply(this, args))
//   }
// }

// log('memoized func')(memoized(expensiveFunc)(6, false))
// log('memoized func')(memoized(expensiveFunc)(6, false))
// log('memoized func')(memoized(expensiveFunc)(6, false))
// const arr = [1,2,3];
// const obj = {};
// obj[arr] = 4;
// console.log(JSON.stringify(obj))

// const func = function (a, b, c) {
//   // const args = Array.prototype.slice.call(arguments)
//   log('arguments')(arguments)
//   log('arguments lenght')(arguments.length)
//   log('this')(this)
// }
// const obj = {
//   name: 'kosac',
//   id: 1,
//   method: func
// }
// func(1,2,3,4,5)
// obj.method(1,2,3)

// // const funcinstance = new func();
// new func(1,2,4) // invoking as constructor

// const funcCon = function() {
//   return function() {
//     log('constructor')(this);
//   };
// }
// const funcInner = new funcCon()
// funcInner(1,2,3)

// const funcCon2 = function() {
//   log('arguments in funccon2')(arguments)
//   this.innerFunc = function() {
//     log('arguments in inner constructor')(arguments)
//     return this;
//   }
// }

// const funcInner2 = new funcCon2();
// log('funcinner2')(funcInner2.innerFunc(1,2,3))

// const funcCon3 = function() {
//   return this.inner = function() {
//     log('funcCon3')(arguments)
//     return this;
//   }
// }

// const innerFunc3 = new funcCon3();
// log('funcCon3')(innerFunc3(1,2,3,4,5,6))

// function kosac() {
//   this.member = function() {
//     return this;
//   }
// }

// const aKosac = kosac(); // this === window in non-strict mode; this === undefined in strict mode
// log('aKosac')(aKosac)
// const newKosac = new kosac();
// log('newKosac')(newKosac.member())
// console.assert(true, 'asset success')

// const Csrt = function() {
//   this.memberMethod = function() {
//     console.log(this)
//     return this;
//   }
//   return 1;
// }
// // run on jsbin.com below in not strict mode
// // log('csrt')(csrt())
// const csrtIns = new Csrt();
// log('this(of csrt function)')(csrtIns.memberMethod())

const IIFE = (function() {
  const obj = {
    name: 'lim',
    method: () => {
      console.log(this)
      return this
    }
  }
  return obj;
})();
log('iife')(IIFE.method())