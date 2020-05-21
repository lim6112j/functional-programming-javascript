import Axios from 'axios';
import { forkJoin } from 'rxjs';
import * as R from 'ramda';
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
Axios(url)
.then(results => {
  const users=results.data;
  users.sort((a,b) => 
  a.id < b.id ? -1 
  : a.id > b.id ? 1
  : 0
  );
  // console.log(users);
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    if(user.country === 'kr'){
      Axios(`${url}${user.id}`)
      .then(res => {
        const user = res.data;
        showUsers(user, user.grades) 
      })
      .catch(err => console.log(err))
    }
  }
})
.catch(err => console.log(err))
/**
 * nested callback chain with Promise Monad
 */
// Axios.get(url)
// .then(data => (data.data))
// .then(R.filter(s => s.country === 'kr'))
// .then(R.sortBy(R.prop('id')))
// .then(R.map(user => {
//     Axios.get(`${url}${user.id}`)
//     .then(R.map(user => user.name ? showUsers(user, user.grades) : null))
//   }
// ))
// .catch(err => console.log(err))
// function showUsers(T, P) {
//   console.log(T.name, " has won ", P, "points")
// }