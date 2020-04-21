import * as R from 'ramda'
import expect from 'expect';
import axios from 'axios';
import { from, of } from 'rxjs';
import { reduce, map, switchMap, filter, catchError, fromPromise } from 'rxjs/operators'
import { fromFetch } from 'rxjs/fetch';
/* Funtional Reactive Programming paradigm - core concept
declarative vs imperative (declarative example : run(I, need, data, from, database), run(I, need, delete, some data, inSomeAPI))

currying ( f(a, b) = f(a)(b) )
closure

first class function
Higher order function

app is just an array of object
functional program ideally use 8 pure function, 2 impure function.

pure function
impure function
side effects (console.log, math.random, external variable, var(let), api, Database, ...)
immutability
mutability

OOP works for minimizing behavior, FP works for minimizing Object.
OOP has too many objects, FP has too many behaviors
OOP and FP should go along. tradeoff between 2 paradigm is very hard and important

Reactive Program handles all data as Stream
Reactive Program should subscribe to observable, not function call to pull data.
*/
// FP: object CRUD with no mutation 
const obj = {id: '1', name: 'ben', phone: '1231231232'};
//add
const objAdded = {...obj, extra: 'new Data'}
console.log('objBefore', obj)
console.log('objAdded', objAdded)
//remove
const { extra, ...objRemoved } = objAdded
console.log('objremoved', objRemoved)
// update
const updatedObj = { ...objRemoved, name: 'jane'}
console.log('name changed', updatedObj)

// FP: list CRUD with no mutation
const arr = [
  {id: 1, name: 'Ben', phone: '3423423423'},
  {id: 2, name: 'Tom', phone: '42234234'},
  {id: 3, name: 'Lim', phone: '5646456456'},
  {id: 4, name: 'Jane', phone: '123123123'}
]
// add
const addedArr = [...arr, {id: 5, name: 'july', phone: '678678678'}]
console.log('addedArr', addedArr)
//update
const updatedArr = addedArr.map(updateDesc)
function updateDesc(user) {
  if(user.name === 'Lim') {
    return {...user, phone: '000'}
  }
  return user; 
}
console.log('updatedArr', updatedArr)
// remove
const removedArr = updatedArr.filter(removeObj);
function removeObj(obj) {
  return obj.name !== 'Lim'
}
console.log('removedArr', removedArr)




// array reduce 
// return  review {points: number} object
const reviews = [4.5, 4.0, 5.0, 2.0, 1.0, 5.0, 3.0, 4.0, 1.0, 5.0, 4.5, 3.0, 2.5, 2.0];

const reviewFunc = R.curry((obj, review) => {
  const number = obj[review] || 0;
  return {...obj, [review]: number + 1};
})
const reviewObj = reviews.reduce(reviewFunc, {})
console.log(reviewObj)

const friends = [
  {name: 'john'},
  {name: 'jane'}
];
// currying
const greet = R.curry((greeting, friend) => {
  return `${greeting} ${friend.name}`;
});
// without ramda
const greetOld = (greeting) => {
  return (friend) => {
    return `${greeting} ${friend.name}`;
  }
}
// partial function with array.map
const helloFriends = friends.map(greet('hello'))
const goodByeFriends = friends.map(greet('good bye'))
const helloFriendsOld = friends.map(greetOld('hello old'))
// partial function with Ramda
const helloFriendsR = R.map(greet('Ramda hello'), friends)


console.log(helloFriends)
console.log(goodByeFriends)
console.log(helloFriendsOld)
console.log(helloFriendsR)


// count how many digits

const sentense = "Note for versions > 0.25 Ramda versions > 0.25 don't have a default export. So instead of import R from 'ramda';, one has to use import * as R from 'ramda'; Or better yet, import only the required functions via import { functionName } from 'ramda';"
const numberInString = R.pipe(
  R.split(''),
  R.map(parseInt),
  R.filter(Number.isInteger),
  R.length
)
expect(numberInString(sentense)).toBe(6)
console.log('######### test passed ##########')

// data transform in functional programming
const grades = [
  {name: 'lim', grade: 99},
  {name: 'ben', grade: 80},
  {name: 'jane', grade: 65},
  {name: 'park', grade: 77}
];

const rules = {
  a: 'Excellent',
  b: 'good',
  c: 'welldone',
  d: 'terrible'
};
const gradefunc = (points) => {
  if(points >= 90){
    return 'a';
  } else if (points >= 80){
    return 'b'; 
  } else if (points >= 70){
    return 'c'; 
  } else if (points >= 60){
    return 'd';
  }
}
const feedback = (feedbackRules) => {
  return (member) => {
    const grade = gradefunc(member.grade);
    const message = feedbackRules[grade];
    return `${message} ${member.name}, you got a ${grade}`;
  }
}
const feedbackOld = grades.map(
  feedback(rules)
);
const feedbacks = R.map(
  feedback(rules)
)(grades)
console.log(feedbackOld)
console.log(feedbacks)

// functional example
console.log("######## legacy => functional ")
class Kosac {
  constructor(id, name, address) {
    this.id = id;
    this.name = name;
    this.address = address;
  }
  getName() {
    return this.name;
  }
  getId() {
    return this.id;
  }
  getAddress() {
    return this.address;
  }
}
const aKosac =new Kosac(1, 'lim', 'gangnam');
aKosac.id = 2 // serious problem
console.log(aKosac.id)

const kosacs = [
  new Kosac(1, 'lim', 'gangnam'),
  new Kosac(2, 'jen', 'gangnam'),
  new Kosac(3, 'kang', 'gangnam'),
  new Kosac(4, 'park', 'ggi'),
  new Kosac(5, 'ben', 'ggi')
];
console.log(kosacs);

function peopleinGangnam(members) {
  for (let i = 0; i < members.length; i++) {
    if(members[i].address === 'gangnam') {
      console.log(members[i])
    }
  }
}
function peopleinGyonggi(members) {
  for (let i = 0; i < members.length; i++) {
    if(members[i].address === 'ggi') {
      console.log(members[i])
    }
  }
}
peopleinGangnam(kosacs)
peopleinGyonggi(kosacs)

// refactoring 1
console.log('########### refactoring 1############')
const filtered = kosacs.filter(
  selector('gangnam')
);

function selector(address, member) {
  return (member) => {
    if(member.address === address) {
      return true;
    }
  }
}

console.log(filtered)

// refactoring with R
console.log('#########refactoring 2##############')
const addressLens = R.lens(R.path(['address']), R.assocPath(['address'])); // getter , setter
// const addressLens = R.lensProp('address')
console.log(R.view(addressLens, aKosac))
const aKosac2 = R.set(addressLens, 'busan', aKosac)
console.log(aKosac)
console.log(aKosac2) // immutably copied

const filteredFunc = (address) => { 
  return kosacs.filter(
  selector(address)
  );
}
console.log(filteredFunc('gangnam'))

// refactoring 3
console.log('refactoring 3')
const filteredHOF = (address, members) => {
    return members.filter(
      selector(address)
    );
}
console.log(filteredHOF('ggi', kosacs))

// eventually filteredFinish(filter, kosacs, output)
console.log('########### finishing refactoring ##############')
const isGangnam = (str) => str.address === 'gangnam' ? true: false;

const gangnamFilter = R.pipe(R.filter(isGangnam), console.log);
gangnamFilter(kosacs)
// use foreach
console.log('######## using foreach')
function printKosac(members, _selector, log) {
  members.forEach(function(member) {
    if(_selector(member)) {
      log(member)
    }
  })
}
printKosac(kosacs, isGangnam, console.log)
// generalize printKosac
const inWhere = (where) => (member) => member.address === where ? true: false;
const inWhereF = (prop) => {
  return (where) => {
    return (member) => {
      return member[prop] === where ? true: false;}}}
const run = (...functions) => (initial) => {
  return functions.reduce((prevResult, fn) => fn(prevResult), initial)
}
console.log('#########generalize printKosac ########')
run(R.filter(inWhere('gangnam')), console.log)(kosacs)
run(R.filter(inWhereF('address')('gangnam')), R.filter(inWhereF('name')('lim')), console.log)(kosacs)
// currying
function multiply(a) {
  return (b) => {
    return (c) => {
      return a * b * c;
    }
  }
}
// wrong
function multiply2(a, b, c) { // b,c not used
  return (b) => {
    return (c) => {
      return a * b * c;
    }
  }
}
console.log('currying method ', multiply(1)(2)(3)) 
console.log('currying method ', multiply2(1)(2)(3)) // works why?
console.log('currying method', multiply2(2,3,4)) // return (b) => {} , not working why?
// partial function
const multiplyPartial3 = multiply(3);
const multiplyPartial23 = multiply2(2, 3);
console.log('partial function multiply 3* => ', multiplyPartial3(10)(11)); // working
console.log('partial function multiply 2*3 => ', multiplyPartial23(10)); // not working

// async data 
console.log('################promise chaining')


const user$ = from(axios.get('https://jsonplaceholder.typicode.com/users')).pipe(
  switchMap(res => {
    // console.log(res.data)
    return res.data
  }),
  filter(idSelector(5)),
  switchMap((member) => axios.get(`https://jsonplaceholder.typicode.com/users/${member.id}`).then(data => data.data)),
  catchError(err => {
    console.log(err);
    return of({ error: true, message: err.message})
  })
);
function idSelector(id) {
  return member => member.id === id ? true: false;
}
const subs = user$.subscribe({
  next: result => console.log(result),
  complete: () => console.log('done')
});
setTimeout(() => {
  subs.unsubscribe()
}, 10000);