import Vue from 'vue';

Vue.filter('numberCommas', (value) => {
  if (!value && value !== 0) return '';
  const roundedVal = Math.ceil(value);
  const numberWithCommas = roundedVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return numberWithCommas;
});

Vue.filter('time', (hours) => {
  if (!hours && hours !== 0) return '';
  const days = Math.floor(hours / 24);
  let timeString = '';
  if (days > 0) {
    timeString = `${days}`;
    if (days > 1) {
      timeString = `${timeString} Days`;
    } else {
      timeString = `${timeString} Day`;
    }
  }
  const remainder = hours % 24;
  const remainingHours = Math.floor(remainder);
  if (remainingHours > 0) {
    timeString = `${timeString} ${remainingHours}`;
    if (remainingHours > 1) {
      timeString = `${timeString} Hours`;
    } else {
      timeString = `${timeString} Hour`;
    }
  }
  return timeString;
});

Vue.filter('currency', (number, currencySymbol, decimalCount) => {
  const digitsRE = /(\d{3})(?=\d)/g;
  const value = parseFloat(number);
  if (!value && value !== 0) return '';
  const currency = currencySymbol != null ? currencySymbol : '$';
  const decimals = decimalCount != null ? decimalCount : 2;
  const stringified = Math.abs(value).toFixed(decimals);
  const int = decimals
    ? stringified.slice(0, -1 - decimals)
    : stringified;
  const i = int.length % 3;
  const head = i > 0
    ? (int.slice(0, i) + (int.length > 3 ? ',' : ''))
    : '';
  const float = decimals
    ? stringified.slice(-1 - decimals)
    : '';
  const sign = value < 0 ? '-' : '';
  return sign + currency + head +
    int.slice(i).replace(digitsRE, '$1,') +
    float;
});

Vue.filter('date', (value) => {
  if (!value && value !== 0) return '';
  const date = (new Date(value)).toLocaleString([], {
    weekday: 'short',
    month: 'numeric',
    day: 'numeric',
  });
  return date;
});

Vue.filter('dateShort', (value) => {
  if (!value && value !== 0) return '';
  const date = (new Date(value)).toLocaleString([], {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
  }).replace(/\//g, ' / ');
  return date;
});

Vue.filter('datetime', (value) => {
  if (!value && value !== 0) return '';
  const date = (new Date(value)).toLocaleString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return date;
});
