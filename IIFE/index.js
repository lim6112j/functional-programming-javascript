(function(){console.log('hello this is IIFE')})()

const IIFE = (function(){
  const variable = 'lim'
  console.log('hello this is 2nd IIFE')
})()

console.log(typeof IIFE === 'undefined')

const IIFE2 = function(){
  const variable = 'lim'
  console.log('hello this is 2nd IIFE')
}() 

// return a function with IIFE

const IIFEWithReturn = function(){
  const varibale = 'isolated var, '
  return (val) => console.log(`${varibale} ${val}`) 
}()
const IIFEWithReturnWithParenthesis = (function(){
  const varibale = 'isolated var, '
  return (val) => console.log(`${varibale} ${val}`) 
})()
IIFEWithReturn('2nd variable')
IIFEWithReturnWithParenthesis('2nd variable')

// IIFE with external variable
const name = 'IIFE'; // ; is important !!!! 
(function(p1){console.log(`${p1} is useful for closure`)})(name)