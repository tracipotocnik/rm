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

  date(value) {
    if (!value && value !== 0) return '';
    const date = (new Date(value)).toLocaleString([], {
      weekday: 'short',
      month: 'numeric',
      day: 'numeric',
    });
    return date;
  },

  datetime(value) {
    if (!value && value !== 0) return '';
    const date = (new Date(value)).toLocaleString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    return date;
  },

  sameDate(date1, date2) {
    if (this.date(date1) === this.date(date2)) {
      return true;
    }
    return false;
  },

  // usage: toTimeZone("America/Los_Angeles")
  toTimeZone(timeZone) {
    return moment().tz(timeZone).format('z');
  },
};
