export class Wrapper {
  constructor(value) {
    this._value = value
  }
  map(f) {
    return new Wrapper(f(this._value))
  }
  toString() {
    return 'Wrapper (' + this._value + ')'
  }
  chain(f) {
    return f(this._value);
  }
}

const obj = { name: 'iphone 12', price: 1200, discount: 20};
const wrappedObj = new Wrapper(obj);
const f = (v) => v.name;
wrappedObj.map(f).map(console.log);

const fn = (v) => new Wrapper(v.name);

wrappedObj.chain(fn).chain(console.log);