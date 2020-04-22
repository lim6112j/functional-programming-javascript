import _ from 'lodash'
import Kosac from './kosac'
const util = require('util')
const kosacs = [
  new Kosac(1, 'lim', 'gangnam'),
  new Kosac(2, 'jen', 'gangnam'),
  new Kosac(3, 'kang', 'gangnam'),
  new Kosac(4, 'park', 'ggi'),
  new Kosac(5, 'ben', 'ggi')
];
// console.log(kosacs)
const log = (val) => console.log(val)
const guSelector = (address) => (user) => user.address === address ? true: false;
_(kosacs).filter(guSelector('ggi')).map(log).value()
_(kosacs).groupBy(kosac => kosac.address).map(group => group.length).map(log).value()
const idSelector = (id) => (user) => user.id === id ? true: false;
// axios.get('https://jsonplaceholder.typicode.com/users')
// .then(result => {
//   // _.map(result.data, console.log)
//   _(result.data).filter(idSelector(3)).map(log).value()
// })
// _.map(arr, fn) _.filter(_.map(arr, fn), fn) => nesting.....
// _(arr).map(fn).filter() => chaining
// _.chain(arr).map(fn).filter()
const isNotValid = val => _.isUndefined(val) || _.isNull(val);
const notAllValid = (...args) => _(args).some(isNotValid);
console.log(isNotValid(null)) // true
console.log(isNotValid(0)) // false
console.log(notAllValid('string', 0, undefined, null)) // true
console.log(notAllValid('string', 0, {})) // false

_.mixin({
  'select': _.map,
  'from': _.chain,
  'where': _.filter,
  'sortBy': _.sortByOrder
})
_.from(kosacs).where(guSelector('ggi')).select(log).value()

const myGarden = [
  {category:'veggie', alias: 'tomato', color: 'red', isFavorite: true},
  {category:'veggie', alias: 'pepper', color: 'yellow', isFavorite: true},
  {category:'flower', alias: 'zinnia', color: 'red', isFavorite: true},
  {category:'flower', alias: 'tulip', color: 'yellow', isFavorite: false},
  {category:'pet', alias: 'dog', color: 'tri-color', isFavorite: true},
  {category:'pet', alias: 'cat', color: 'black', isFavorite: true},
  {category:'tool', alias: 'pruning knife', color: 'black', isFavorite: false},
  {category:'tool', alias: 'planter', color: 'red', isFavorite: true}
]
let favorites = _.chain(myGarden)
 .where('isFavorite')
 .reject(['category', 'tool'])
 .sortBy(['color', 'alias'])
 .groupBy('color')
 .select(function(group) {return group[0];})
 .map(function(item){
 let text = _.join([item.color, item.alias], " ");
 return text;
 })
 .value()
//  .toString();
// console.log('My favorites: ' + favorites);
console.log(util.inspect(favorites, {showHidden: false, depth: null}))