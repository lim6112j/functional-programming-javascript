// use external class function as property
class Engine {
  start() {
    console.log('Started');
  }
  stop() {
    console.log('engine stop');
  }
}
class Car {
  constructor(/* private engine: Engine */) {
    this.engine = new Engine();
  }
  // function as property
  start() {
    this.engine.start()
  }
  // start = this.engine.start;
  // stop = this.engine.stop
}

const car = new Car();
// const car = new Car(new Engine());
car.start()