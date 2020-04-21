import _ from 'lodash'
import axios from 'axios'
import Kosac from './kosac'
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
axios.get('https://jsonplaceholder.typicode.com/users')
.then(result => {
  // _.map(result.data, console.log)
  _(result.data).filter(idSelector(3)).map(log).value()
})

const isNotValid = val => _.isUndefined(val) || _.isNull(val);
const notAllValid = (...args) => _(args).some(isNotValid);

console.log(notAllValid('string', 0, undefined, null))
console.log(notAllValid('string', 0, {}))

_.mixin({
  'select': _.map,
  'from': _.chain,
  'where': _.filter,
  'sortBy': _.sortByOrder
})
_.from(kosacs).where(guSelector('ggi')).select(log).value()