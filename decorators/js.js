/**
 * run 'yarn run start ./decorators/js'
 */
import {log, logl, proLog } from '../utils/index';
function logDecorator(target, name, descriptor) {
  log('target of decorator')(target);
  log('name of decorator')(name);
  log('descriptor of decorator')(descriptor);
  const original = descriptor.value;
  if(typeof original === 'function') {
    descriptor.value = function(...args) {
      log('Arguments')(args);
      try {
        const result = original.apply(this, args);
        console.log(`Result: ${result}`);
        return result
      } catch (e) {
        log('error')(e);
        throw e;
      }

    }
    
  }
  return descriptor;
}

class Example {
  @logDecorator
  sum(a, b) {
    return a, b;
  }
}

const e = new Example();
e.sum(1, 2)