import {
  IMAGE_JPEG_MIME_HEADER,
  IMAGE_PNG_MIME_HEADER,
} from './mime.constants';

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

/**
 * generate random number in inclusive range
 * @param {*} min
 * @param {*} max
 */
export function rangeRandom(min, max) {
  return Math.random() * (max - min) + min;
}

export function checkIfMimeAccepted(acceptedMimes, actualHeader) {
  console.info('actual header' + actualHeader);
  for (let acceptedMime of acceptedMimes) {
    const headers = convertMimeToConst(acceptedMime);
    console.info('mime ' + acceptedMime + ' headers ' + headers);
    if (headers.some((h) => h === actualHeader)) {
      return true;
    }
  }
  return false;
}

export function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1]);
  else byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mimeString });
}
/**================ not exported functions ================*/
function convertMimeToConst(mime) {
  switch (mime) {
    case 'image/png':
      return IMAGE_PNG_MIME_HEADER;
    case 'image/jpeg':
    case 'image/jpg':
      return IMAGE_JPEG_MIME_HEADER;
  }
}
