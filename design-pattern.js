// functor, monad
import _ from 'lodash'
import * as R from 'ramda'
const log = (val) => console.log(val)
// compare functor - map , monad - flatMap design pattern
const arr = [1,2,3,4,5]
const arr2 = _(arr).map(x => [x*2]).value()
console.log(arr2)
const arr3 = _(arr).flatMap(x => [x*2]).value()
console.log(arr3)
// error 
const arrNull = null
const arr4 = _(arrNull).map(x => [x*2]).value()
log('null value mapping ', arr4)
// ramda identity function
const { identity } = R
R.map(identity, [1,2,3]).map(log)