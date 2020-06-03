import {Either} from 'ramda-fantasy';
import * as R from 'ramda';
import _ from 'lodash';
var Left = Either.Left
var Right = Either.Right
const curry = R.curry;
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