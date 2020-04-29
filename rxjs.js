import { from, of } from 'rxjs';
import axios from 'axios'
import { reduce, flatMap, tap, map, switchMap, filter, catchError, fromPromise } from 'rxjs/operators'
import { fromFetch } from 'rxjs/fetch';
import util from 'util';
const log =(msg) => (v) => console.log(msg, " => ",util.inspect(v, true, 10, true));
const proLog = (msg) => (v) => v.then(log(msg));
// async data 
// console.log('################promise chaining')


// const user$ = from(axios.get('https://jsonplaceholder.typicode.com/users')).pipe(
//   switchMap(res => {
//     // console.log(res.data)
//     return res.data
//   }),
//   filter(idSelector('Chelsey Dietrich')),
//   switchMap((member) => axios.get(`https://jsonplaceholder.typicode.com/users/${member.id}`).then(data => data.data)),
//   catchError(err => {
//     console.log(err);
//     return of({ error: true, message: err.message})
//   })
// );
// function idSelector(id) {
//   return member => member.name === id ? true: false;
// }
// const subs = user$.subscribe({
//   next: result => console.log(result),
//   complete: () => console.log('done')
// });
// setTimeout(() => {
//   subs.unsubscribe()
// }, 10000);

// reduce with promise accumulator
of(1,2,3,4,5).pipe(
  reduce((acc, v) => {
    return acc.then(val => Promise.resolve(val + v))
  }, Promise.resolve(0)),
  // tap(log('in the reduce pipe'))
)
.subscribe(proLog('reduce'))
// .subscribe(val=>val.then(log('reduce with promise accumulator')));

// map flatmap switchmap
of(1,2,3,4,5).pipe(
  map(v => from(Promise.resolve(100)))
)
.subscribe(val => val.subscribe(log('map')));

of(1,2,3,4,5).pipe(
  flatMap(v => from(Promise.resolve(100)))
)
.subscribe(log('flatMap'))

of(1,2,3,4,5).pipe(
  switchMap(v => from(Promise.resolve(100)))
)
.subscribe(log('switchMap'))

