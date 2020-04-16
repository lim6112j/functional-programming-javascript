import * as R from 'ramda'
import expect from 'expect'
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