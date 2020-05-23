import Axios from 'axios';
import { forkJoin } from 'rxjs';
import _ from 'lodash';
import * as R from 'ramda';
import {log, proLog, logl} from '../utils';
// var users = null;
const url = 'http://localhost:3000/users/';
// function showUsers(users) {
//   console.log(users);
// };
// Axios.get(url)
// .then(results => {
//   users = results.data;
// })
// .catch(err => console.log(err));

// showUsers(users); // temporal coupling

/**
 * nested callback chain
 */
// Axios(url)
// .then(results => {
//   const users=results.data;
//   users.sort((a,b) => 
//   a.id < b.id ? -1 
//   : a.id > b.id ? 1
//   : 0
//   );
//   // console.log(users);
//   for (let i = 0; i < users.length; i++) {
//     let user = users[i];
//     if(user.country === 'kr'){
//       Axios(`${url}${user.id}`)
//       .then(res => {
//         const user = res.data;
//         showUsers(user, user.grades) 
//       })
//       .catch(err => console.log(err))
//     }
//   }
// })
// .catch(err => console.log(err))
/**
 * nested callback chain with Promise Monad
 */
function showUsers(T, P) {
  console.log(T.name, " has won ", P, "points")
}
function run(...functions) {
  return (initial) => {
    return functions.reduce((prevReturn, fn) => fn(prevReturn), initial);
  }
}
// const fns = run (
//   data => data.data,
//   R.filter(s=> s.country === 'kr'),
//   R.sortBy(R.prop('id')),
//   R.map(user => {
//   Axios.get(`${url}${user.id}`).then(R.map(user => user.name ? showUsers(user, user.grades) : null))
//   }
// ));


// Axios.get(url)
// .then(fns)
// .catch(err => console.log(err))
const then = R.curry((f, promise) => promise.then(f));
const catchF = R.curry((f, promise) => {promise.catch(f); return promise})
const errLog = _.partial(console.log, '###### Promise Failed ######');
const axiosInner = (user) => Axios.get(`${url}${user}`);
const chain = R.curry((f, x) => f(x));

const showUser = run(
  chain(Axios.get),
  then(data => data.data),
  then(R.filter(s=> s.country === 'kr')),
  // then(R.tap(v => console.log(v))),
  then(R.sortWith([R.ascend(R.prop('id'))])),
  then(R.map(axiosInner)),
  // then(R.tap(v => console.log(v.length))),
  then(R.tap(R.map(then(data => console.log(data.data))))),
  catchF(log('######### Error 1 ###########')),
  then(R.map(catchF(log('####### Error 2 #########'))))
);
showUser(url);
// const showUser2 = R.compose(
//   catchF(errLog),
//   then(R.map(axiosInner)),
//   then(R.sortBy(R.prop('id'))),
//   then(R.filter(s => s.country === 'kr')),
//   then(data => data.data),
//   chain(Axios.get)
// )
// showUser2(url)