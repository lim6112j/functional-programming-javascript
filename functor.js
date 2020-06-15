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
}

const obj = { name: 'iphone 12', price: 1200, discount: 20};
const wrappedObj = new Wrapper(obj);
wrappedObj.map(v => v.name).map(console.log);