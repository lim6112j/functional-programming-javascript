const root = document.getElementById("root");
const ele = document.createElement('h1');
ele.innerHTML = "typescript playground";
root?.appendChild(ele);
import { from, of } from 'rxjs';
import { concatMap, timestamp, tap, flatMap, map } from 'rxjs/operators';
import { log, logl, subscriber } from '../utils';
// import PouchDB from 'pouchdb';
// const userDB = new PouchDB('users');
// class User {
//   constructor(public name: string, public age: number, public date?: number){}
// }

// const users = [
//   new User('lim', 20),
//   new User('kim', 40),
//   new User('joo', 33)
// ];

// const users$ = from(users).pipe(
//   timestamp(),
//   map(obj => ({...obj.value, date: obj.timestamp})),
//   tap(console.log),
//   concatMap(user => userDB.post(user)),
// );


// const destroyDB = (): void => {
//   userDB.destroy().then(log('destroy DB success!')).catch(log('failed DB destroy'));
// }
// // users$.subscribe(subscriber()(10));
// userDB.info().then((info: any) => {
//   console.log(info);
//   // info.doc_count > 0 ? destroyDB() :users$.subscribe(subscriber()(10)) ;
// });

// const findById = (id: string): any => {
//   return userDB.get(id);
// }

// const findUser$ = (id: string) => from(findById(id));

// // findUser$("092375c2-be1d-415b-a55a-f93d82705b6e")
// // .subscribe(subscriber()(10));

// // findUser$("no id").pipe(
// //   tap(log)
// // ).subscribe(subscriber()(10));

// import {Try, Success, Failure} from './try_monad';
// const processTry = (replacement: any = null) => (p: any) => {
//   return p.then((v: any) => new Success(v))
//           .catch((err:any) => {
//             console.log("### Error, if exists, replacement will be used ######" ,err);
//             return new Failure(replacement ? replacement : err)});
// };
// let record = Try.of(() => findById("92375c2-be1d-415b-a55a-f93d82705b6e"))
// .map(processTry(new User("jane doe", 0, Date.now())))
// .flatten();

// record.then((v:any) => console.log(v))

/**
 * throw error will handle in subscribe automatically
 */
const computeHalf = (x: number) => Math.floor(x / 2);
of(2, 4, 5, 8, 10).pipe(
  map(num => {
    if(num % 2 !== 0) {
      throw new Error(`Unexpected odd number: ${num}`);
    }
    return num;
  }),
  map(computeHalf),
).subscribe(subscriber(null)(10))