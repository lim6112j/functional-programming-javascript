import {Either} from 'ramda-fantasy';
import * as R from 'ramda';
import _ from 'lodash';
var Left = Either.Left
var Right = Either.Right
const curry = R.curry;

// //imperative
// //Returns error or price including tax 
// const tax = (tax, price) => {
//   if (!_.isNumber(price)) return new Error("Price must be numeric");

//   return price + (tax * price);
// };

// //Returns error or price indluding discount
// const discount = (dis, price) => {
//   if (!_.isNumber(price)) return (new Error("Price must be numeric"));

//   if (price < 10) return new Error("discount cant be applied for items priced below 10");

//   return price - (price * dis);
// };

// const isError = (e) => e && e.name == 'Error';

// const getItemPrice = (item) => item.price;

// //shows total price after tax and discount. Need to handle multiple errors.
// const showTotalPrice = (item, taxPerc, disount) => {
//   let price = getItemPrice(item);
//   let result = tax(taxPerc, price);
//   if (isError(result)) {
//     return console.log('Error: ' + result.message);
//   }
//   result = discount(discount, result);
//   if (isError(result)) {
//     return console.log('Error: ' + result.message);
//   }
//   //display result
//   console.log('Total Price: ' + result);
// }

// let tShirt = { name: 't-shirt', price: 11 };
// let pant = { name: 't-shirt', price: '10 dollars' };
// let chips = { name: 't-shirt', price: 5 }; //less than 10 dollars error

// showTotalPrice(tShirt) // Total Is: 9.075
// showTotalPrice(pant)   // Error: Price must be numeric
// showTotalPrice(chips)  //Error: discount cant be applied for items priced below 10

const tax = curry((tax, price) => {
  if(!_.isNumber(price)) return Left(new Error("price must be numeric"))

  return Right(price - (tax * price))
});
const discount = curry((dis, price) => {
  if(!_.isNumber(price)) return Left(new Error("Price must be numeric"));
  if(price < 10) return Left(new Error("discount cant be applied for items priced below 10"));
  return Right(price - price * dis);
});
const addCaliTax = tax(0.1);
const apply25PercDisc = discount(0.25);
const getItemPrice = (item) => Right(item.price);
const displayTotal = (total) => { console.log('Total Price: ' + total) }
const logError = (error) => { console.log('Error: ' + error.message); };
const eitherLogOrShow = Either.either(logError, displayTotal);
const showTotalPrice = (item) => eitherLogOrShow(getItemPrice(item).chain(apply25PercDisc).chain(addCaliTax));

let tShirt = { name: 't-shirt', price: 11 };
let pant = { name: 'pant', price: '10 dollars'};
let chips = { name: 't-shirt', price: 5}

showTotalPrice(tShirt)
showTotalPrice(pant)
showTotalPrice(chips)