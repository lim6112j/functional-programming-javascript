// monad is also an Applicative, implemented ap function
import {Maybe} from 'ramda-fantasy'
import * as R from 'ramda'
const curry = R.curry;
/**
 * dealing Null checks with monads
 */

// let user = {
//   name: 'lim',
//   discount: 'aaa'
// }
let user;
let discount = {
  code: 'bbb'
}
const maybeUser = Maybe(user);
const maybeDiscount = Maybe(discount);
var applyDiscount = curry(function (user, discount) {
  user.discount = discount.code;
  return user;
});

const maybeApplyDiscountFunc = maybeUser.map(applyDiscount);
maybeApplyDiscountFunc.ap(maybeDiscount); 
console.log(user)

// using Validation applicative in foltale library , fantasyland doesn't have this applicative

import {validation} from 'folktale';
const Success = validation.Success;
const Failure = validation.Failure;

// Instead of:
function isUserNameValidBad(a) {
  return /^(0|[1-9][0-9]*)$/.test(a) ?
    ["Username cant be a number"] : a
}
// use:
function isUsernameValid(a) {
  return /^(0|[1-9][0-9]*)$/.test(a) ?
    Failure(["Username can't be a number"]) : Success(a)
}

function isPwdLengthCorrect(a) {
  return a.length == 10 ? Success(a) : Failure(["Password must be 10 characters"])
}

function ieEmailValid(a) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(a) ? Success(a) : Failure(["Email is not valid"])
}

const returnSuccess = () => 'success';//simply returns success

function validateForm(username, pwd, email) {
  let success = R.curryN(3, returnSuccess);//3 coz we are calling "ap" 3 times.
  return Success(success)
      .ap(isUsernameValid(username))
      .ap(isPwdLengthCorrect(pwd))
      .ap(ieEmailValid(email))
}


console.log(validateForm('raja', 'pwd1234567', 'r@r.com').value);
//Output: success

console.log(validateForm('raja', 'pwd', 'r@r.com').value);
//Output: ['Password must be 10 characters' ]


console.log(validateForm('raja', 'pwd', 'notAnEmail').value);
//Output: ['Password must be 10 characters', 'Email is not valid']

console.log(validateForm('123', 'pwd', 'notAnEmail').value);
//['Username can\'t be a number', 'Password must be 10 characters', 'Email is not valid']