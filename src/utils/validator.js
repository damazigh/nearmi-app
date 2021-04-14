import { isNumeric } from './utils';

/**
 *
 * @param {*} str string to validate
 * @param {*} val epxected length
 * @returns `true`if `str.length === val`
 */
export function length(str, val) {
  return str.length === val;
}

/**
 * validate length witout counting white space
 * @param {*} str
 * @param {*} val
 */
export function lengthWithoutSpace(str, val) {
  return str.replaceAll(' ', '').length === val;
}
/**
 * validate that given string input is numeric
 * @param {*} str string to validate
 * @returns true if it matches regex false else
 */
export function numeric(str) {
  const res = isNumeric(str);
  console.log(res + ' ' + str);
  return res;
}

/**
 * validate that given (sanitized from white spaces is numeric
 * @param {*} str given string
 */
export function numericWithoutSpace(str) {
  str = str.replaceAll(' ', '');
  return numeric(str);
}

/**
 * validate with luhn algorithm
 * @param {*} str
 */
export function luhn(str) {
  if (numericWithoutSpace(str)) {
    str = str.replaceAll(' ', '');
    let sum = 0;
    for (let i = 1; i <= str.length; i++) {
      const parsed = Number.parseInt(str[str.length - i]);
      if (i % 2 === 0) {
        const tmp = parsed * 2;
        sum += tmp > 9 ? tmp - 9 : tmp;
      } else {
        sum += parsed;
      }
    }
    const ncheck = Number.parseInt(
      [...str.slice(str.length - 1)].reduce((a, b) =>
        a + b > 9 ? a + b - 10 : a + b
      )
    );
    return (
      sum % 10 === 0 && ncheck === Number.parseInt(str.charAt(str.length - 1))
    );
  }
  return false;
}

export function numericOrEmpty(str) {
  return !str || numeric(str);
}

export async function asyncValidator(fn) {
  const res = await fn();
  return res.data;
}
