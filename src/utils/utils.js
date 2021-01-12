export function format(str, args) {
  for (let k in args) {
    str = str.replace(new RegExp('\\{' + k + '\\}', 'g'), args[k]);
  }
  return str;
}

export function isNumeric(str) {
  return /^\d+$/.test(str);
}
