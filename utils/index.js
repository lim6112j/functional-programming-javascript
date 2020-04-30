import util from 'util';
const log = (function() {
  return function(msg) {
    return function(v) {
      console.log(msg, " => ",v);
    };
  }
})();
const logl = (function() {
  return function(msg) {
    return function(v) {
      console.log(msg, " => ", util.inspect(v, true, 10, true));
    };
  }
})();
const proLog = (function() {
  return function(msg) { 
    return function(v) {
      v.then(log(msg));
    }
  }
}
)();
export {log, proLog, logl};