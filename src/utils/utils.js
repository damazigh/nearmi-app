export function format(str, args) {
  for (let k in args) {
    str = str.replace(new RegExp('\\{' + k + '\\}', 'g'), args[k]);
  }
  return str;
}

export function isNumeric(str) {
  return /^\d+$/.test(str);
}

export function mapToAddress(addr) {
  const address = {};
  address.city = addr.properties?.city;
  address.longitude = addr.geometry?.coordinates[0];
  address.latitude = addr.geometry?.coordinates[1];
  address.postalCode = addr.properties?.postcode;
  address.line1 = `${addr.properties?.label}`;
  address.country = 'France';
  return address;
}

export function toTime(timeAsStr) {
  if (timeAsStr) {
    const tab = timeAsStr.split(':');
    if (tab.length === 2) {
      return { hour: tab[0], minute: tab[1] };
    }
  }
  return null;
}

export function checkImage(path) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(path);
    img.onerror = () => reject();
    img.src = path;
  });
}
