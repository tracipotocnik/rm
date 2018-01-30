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
};
