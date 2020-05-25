import * as util from 'util';
const log = (function() {
  return function(msg: string) {
    return function(v: any) {
      console.log(msg, " => ",v);
    };
  }
})();
const logl = (function() {
  return function(msg: string) {
    return function(v: any) {
      console.log(msg, " => ", util.inspect(v, true, 10, true));
    };
  }
})();
const proLog = (function() {
  return function(msg: string) { 
    return function(v: any) {
      v.then(log(msg));
    }
  }
}
)();

const subscriber = (f:any) => function(end: number): any {
  let i = 0;
  const obj: any =   {
    next: function(v: any) {
      log('Subscription value')(v);
      if(f) f();
      i++ === end ? this.unsubscribe() : null;
    },
    error: log('Subscription Error'),
    complete: function(){if(f) f();log('completed')(this)}
  }
  return obj;
} 
export {log, proLog, logl, subscriber};
