import moment from 'moment-timezone';

export default {
  handleErrors(response) {
    if (!response.ok) {
      throw Error(response._bodyText); // eslint-disable-line no-underscore-dangle
    }
    return response;
  },

  getFileDataArray(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  },

  bin2String(array) {
    let result = '';
    array.forEach((element) => {
      result += String.fromCharCode(Number(element, 2));
    });
    return result;
  },

  string2Bin(string) {
    let result = '';
    for (let i = 0; i < string.length; i++) { // eslint-disable-line no-plusplus
      result += `${string[i].charCodeAt(0).toString(2)} `;
    }
    return result;
  },

  date(time, timezone) {
    if ((!time && time !== 0) || !timezone) return '';
    const date = moment(time).tz(timezone).format('ddd, M/D');
    return date;
  },

  time(time, timezone) {
    if ((!time && time !== 0) || !timezone) return '';
    const timeFormatted = moment(time).tz(timezone).format('kk:mm');
    return timeFormatted;
  },

  sameDate(date1, date1TZ, date2, date2TZ) {
    if (this.date(date1, date1TZ) === this.date(date2, date2TZ)) {
      return true;
    }
    return false;
  },

  // usage: toTimeZone("America/Los_Angeles")
  toTimeZone(timezone) {
    return moment().tz(timezone).format('z');
  },
};
