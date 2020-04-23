export class Wrapper {
  constructor(value) {
    this._value = value
  }
  map(f) {
    return f(this._value)
  }
  toString() {
    return 'Wrapper (' + this._value + ')'
  }
}