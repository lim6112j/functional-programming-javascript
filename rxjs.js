import { from, of } from 'rxjs';
import axios from 'axios'
import { reduce, map, switchMap, filter, catchError, fromPromise } from 'rxjs/operators'
import { fromFetch } from 'rxjs/fetch';
// async data 
console.log('################promise chaining')


const user$ = from(axios.get('https://jsonplaceholder.typicode.com/users')).pipe(
  switchMap(res => {
    // console.log(res.data)
    return res.data
  }),
  filter(idSelector('Chelsey Dietrich')),
  switchMap((member) => axios.get(`https://jsonplaceholder.typicode.com/users/${member.id}`).then(data => data.data)),
  catchError(err => {
    console.log(err);
    return of({ error: true, message: err.message})
  })
);
function idSelector(id) {
  return member => member.name === id ? true: false;
}
const subs = user$.subscribe({
  next: result => console.log(result),
  complete: () => console.log('done')
});
setTimeout(() => {
  subs.unsubscribe()
}, 10000);