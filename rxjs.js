import { from, of, asyncScheduler,animationFrame, animationFrameScheduler, interval } from 'rxjs';
import axios from 'axios'
import { toArray, groupBy, scan, takeWhile, reduce, flatMap, tap, map, switchMap, filter, catchError, fromPromise, subscribeOn, observeOn, take } from 'rxjs/operators'
import { fromFetch } from 'rxjs/fetch';

import {log, proLog, logl} from './utils';
const subscriber = function(end) {
  const obj =   {
    next: function(v) {
      v === end ? this.unsubscribe() : logl('subs value')(v);;
    },
    error: log('error'),
    complete: function(){logl('completed')(this)}
  }
  return obj;
} 
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
// of(1,2,3,4,5).pipe(
//   reduce((acc, v) => {
//     return acc.then(val => Promise.resolve(val + v))
//   }, Promise.resolve(0)),
//   // tap(log('in the reduce pipe'))
// )
// .subscribe(proLog('reduce'))
// // .subscribe(val=>val.then(log('reduce with promise accumulator')));

// // map flatmap switchmap
// of(1,2,3,4,5).pipe(
//   map(v => from(Promise.resolve(100)))
// )
// .subscribe(val => val.subscribe(log('map')));

// of(1,2,3,4,5).pipe(
//   flatMap(v => from(Promise.resolve(100)))
// )
// .subscribe(log('flatMap'))

// of(1,2,3,4,5).pipe(
//   switchMap(v => from(Promise.resolve(100)))
// )
// .subscribe(log('switchMap'))

// scheduler
// const obs$ = of("A", "B", "C").pipe(
//   tap(log('데이터 처리1')),
//   tap(log('데이터 처리2')),
//   tap(log('데이터 처리3')),
//   tap(log('데이터 처리4')),
//   observeOn(asyncScheduler),
//   subscribeOn(asyncScheduler)
// );
// console.log("subscribe 이전");
// // obs$.subscribe(log('subscription'));
// setTimeout(() => {
//   const start = new Date().getTime();
//   console.log("[1초후 subscribe]");
//   obs$.subscribe(log('observer received'));
//   console.log(`subscribe 후 ${new Date().getTime() - start} ms`)
// }, 1000);

// should run in browser for requestAnimationFrame
// global.requestAnimationFrame = cb => cb()

// const scheduler = animationFrameScheduler;
// const start = scheduler.now();
// const DURATION = 10;
// const animation$ = interval(0, scheduler).pipe(
//   map(() => (scheduler.now() - start)/DURATION),
//   takeWhile(x => x <= 1)
// )
// animation$.subscribe(log('animationFrameScheduler'));
// const obs$ = interval(1000).pipe(
//   take(5),
//   groupBy(n => n % 3),
//   flatMap(group => group.pipe(toArray())),
//   tap(log('array')),
//   scan((acc, v) => {return acc + v}, [])
// )
// const subs =obs$.subscribe(subscriber)
const obs$ = interval(100).pipe(
  // take(5),
  // tap(log('interval value'))
);
const subs = obs$.subscribe(subscriber(5));