const root = document.getElementById("root");
const ele = document.createElement('h1');
ele.innerHTML = "typescript playground";
root?.appendChild(ele);
import { from } from 'rxjs';
import { concatMap, timestamp, tap, flatMap, map } from 'rxjs/operators';
import PouchDB from 'pouchdb';
const userDB = new PouchDB('users');
class User {
  constructor(public name: string, public age: number){}
}

const users = [
  new User('lim', 20),
  new User('kim', 40),
  new User('joo', 33)
];

const users$ = from(users).pipe(
  timestamp(),
  map(obj => ({...obj.value, date: obj.timestamp})),
  tap(console.log),
  concatMap(user => userDB.post(user)),
);

import { log, logl, subscriber } from '../utils';
const destroyDB = (): void => {
  userDB.destroy().then(log('destroy DB success!')).catch(log('failed DB destroy'));
}
// users$.subscribe(subscriber()(10));
userDB.info().then((info: any) => {
  console.log(info);
  // info.doc_count > 0 ? destroyDB() :users$.subscribe(subscriber()(10)) ;
});

const findById = (id: string): any => {
  return userDB.get(id);
}

const findUser$ = (id: string) => from(findById(id));

// findUser$("092375c2-be1d-415b-a55a-f93d82705b6e")
// .subscribe(subscriber()(10));

// findUser$("no id").pipe(
//   tap(log)
// ).subscribe(subscriber()(10));

import {Try, Success, Failure} from './try_monad';

let record = Try.of(() => findById("092375c2-be1d-415b-a55a-f93d82705b6e"))
.map((promise: any) => promise.then((v:any) => new Success(v)).catch((err:any) => new Failure(err)))
.getOrElse(new User('jane', 34));
record.then((v:any) => v.map((res: any) => console.log(res)))