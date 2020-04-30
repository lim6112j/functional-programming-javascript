import util from 'util';
const log = (function() {
  return function(msg) {
    return function(v) {
      console.log(msg, " => ",v);
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
export {log, proLog};