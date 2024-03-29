// functor, monad
import _ from "lodash";
import * as R from "ramda";
import { Maybe, Either } from "./monad";
import util from "util";
import { Tuple } from "./tuple";
import { Wrapper } from "./functor";
const log = (val) => console.log(val);
// compare functor - map , monad - flatMap design pattern
const arr = [1, 2, 3, 4, 5];
const arr2 = _(arr)
  .map((x) => [x * 2])
  .value();
console.log(arr2);
const arr3 = _(arr)
  .flatMap((x) => [x * 2])
  .value();
console.log(arr3);
// error
const arrNull = null;
const arr4 = _(arrNull)
  .map((x) => [x * 2])
  .value();
log("null value mapping ", arr4);
// ramda identity function
const { identity } = R;
R.map(identity, [1, 2, 3]).map(log);

// monad maybe
const num = Maybe.of(4);
const nullval = Maybe.nothing();
console.log(num.toString());
console.log(num.map((x) => x + 2).value);
console.log(nullval.map((x) => x + 2).getOrElse("any"));

// member.address.country.countryCode
const members = [
  {
    name: "lim",
    address: {
      country: {
        countryCode: "kr",
      },
    },
  },
];

const memberMaybe = Maybe.of(members[0]);
console.log(`memberMaybe => ${util.inspect(memberMaybe, true, 10, true)}`);

// imperative
function getCountry(member) {
  let address = member.address;
  if (address !== null) {
    let country = address.country;
    if (country !== null) {
      return country.countryCode;
    }
  }
  return "존재하지 않는 국가";
}
function getCountry2(member) {
  return (
    (member &&
      member.address &&
      member.address.country &&
      member.address.country.countryCode) ||
    "국가가 존재하지 않음."
  );
}
// functional with maybe
const getCountryMaybe = (member) =>
  member
    .map(R.prop("address"))
    .map(R.prop("country"))
    .map(R.prop("countryCode"))
    .getOrElse("존재하지 않는 국가");

console.log(`imperative => ${getCountry(members[0])}`);
console.log(`imperative => ${getCountry2(members[1])}`);
console.log(`functional => ${getCountryMaybe(Maybe.fromNullable(members[0]))}`);
console.log(`functional => ${getCountryMaybe(Maybe.fromNullable(null))}`);

// tuple
const Status = Tuple(Boolean, String);
console.log(util.inspect(Status, true, 0));
const status = new Status(true, "hello tuple");
console.log(status);

// map, fmap
// map: (A -> B) -> A -> B
// fmap: (A -> B) -> wrapper(A) -> wrapper(B)

const wrap = (val) => new Wrapper(val);
const wrappedValue = wrap("hello");
wrappedValue.map((x) => new Wrapper(x + 1)).map(log);

const getCountryEither = (memberEither) =>
  memberEither
    .map(R.prop("address"))
    .map(R.prop("country"))
    .map(R.prop("countryCode"))
    .getOrElse("국가 코드가 존재하지 않습니다.");

console.log(
  `functional => ${getCountryEither(Either.fromNullable(members[0]))}`
);
console.log(
  `functional => ${getCountryEither(Either.fromNullable(members[1]))}`
);
