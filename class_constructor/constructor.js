import {log, logl, proLog} from '../utils';
import { CombineLatestOperator } from 'rxjs/internal/observable/combineLatest';
// use external class function as property
// class Engine {
//   start() {
//     console.log('Started');
//   }
//   stop() {
//     console.log('engine stop');
//   }
// }
// class Car {
//   constructor(/* private engine: Engine */) {
//     this.engine = new Engine();
//   }
//   // function as property
//   start() {
//     this.engine.start()
//   }
//   // start = this.engine.start;
//   // stop = this.engine.stop
// }

// const car = new Car();
// // const car = new Car(new Engine());
// car.start()
// var later;
// function Engine () {
//   function drive() { console.log('drive')}
//   // later = drive
//   this.start = () => {
//     console.log('start');
//   }
//   this.stop = function() {
//     console.log(this)
//   }
// }
// const engine = new Engine();
// logl('engine')(engine)
// Engine()
// later()
// class Engine {
//   start = () => {
//     console.log('Started');
//   }
//   stop() {
//     console.log('engine stop');
//   }
// }
// class Car {
//   constructor(engine) {
//     this.engine = engine;
//   }
//   // function as property
//   start() {
//     this.engine.start()
//   }
//   stop = () => {console.log('stop')}
//   // start = this.engine.start;
//   // stop = this.engine.stop
// }
// const car = new Car(new Engine());
// car.start()
// car.stop()


class Engine {
  static drive = () => {}
  stop() {
    console.log('engine stop');
  }
  get start ()  {
    console.log('engine starts')
  }

}
const engine = new Engine();
engine.start
logl('engine start')(engine)