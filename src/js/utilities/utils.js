export default {
  handleErrors(response) {
    if (!response.ok) {
      throw Error(response._bodyText); // eslint-disable-line no-underscore-dangle
    }
    return response;
  },
};
