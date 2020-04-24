'use strict'
import _ from 'lodash'

const head = ([h]) => h
// const head = ([h, ...tail]) => h 
const tail = ([,...tail]) => tail
// const tail = ([h, ...tail]) => tail
const arr = [1,2,3,4,5]
console.log(head(arr))
console.log(tail(arr))

const copy = arr => [...arr]

const def = x => typeof x !== 'undefined'
const undef = x => !def(x)

const defined = 'this is defined string'
let notdefined

console.log(def(defined))
console.log(def(notdefined))
console.log(undef(notdefined))

const length = ([h, ...tail], len = 0) => def(h) ? length(tail, len + 1) : len // tail-recursive
// const length = ([h, ...tail]) => def(h) ? 1 + length(tail) : 0 // memory increase , not tail-recursive
console.log(length(arr))

const reverse = ([h, ...tail]) => def(h) ? [...reverse(tail), h] : []
console.log(reverse(arr))

//returns First n items of the given array
const first = ([h, ...xs], n = 1, acc = []) => n < 1 ? acc : 
  def(h) ? first([head(xs), ...tail(xs)], n-1, [...acc, h]) : acc
const first2 = ([h, ...xs], n = 1) => def(h) && n ? [h, ...first(xs, n - 1)] : []
console.log(first(arr, 4))
console.log(first2(arr, 4))

// returns new array cotains last n items of the given array

const last = (arr, n = 1) => reverse(first(reverse(arr), n))
console.log(last(arr, 4))

// slice