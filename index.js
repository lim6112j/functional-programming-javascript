import * as R from 'ramda'
import expect from 'expect'
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
  {name: 'jane', grade: 65}
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