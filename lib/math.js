import _ from "lodash";

const add = (num1, num2) => _.add(num1, num2);

const sub = (num1, num2) => _.subtract(num1, num2);

const mult = (num1, num2) => _.multiply(num1, num2);

const div = (num1, num2) => _.divide(num1, num2);

export { add, sub, mult, div };
