
export class Try {
  _val: any;
  constructor(val: any){
    this._val = val;
  }
  static of(fn:any): (Success | Failure) {
    try {
      return new Success(fn());
    } catch (error) {
      return new Failure(error);
    }
  }
  flatten() {
    return this._val;
  }
  map(fn: any) {
    return Try.of(() => fn(this._val));
  }
}
export class Success extends Try {
  getOrElse(anotherVal: any) {
    return this._val;
  };
  getOrElseThrow() {
    return this._val;
  }
}
export class Failure extends Try {
  map(fn: any) {
    return this;
  }
  getOrElse(anotherVal: any) {
    return anotherVal;
  }
  getOrElseThrow() {
    if(this._val !== null) {
      throw this._val;
    }
  }
}
