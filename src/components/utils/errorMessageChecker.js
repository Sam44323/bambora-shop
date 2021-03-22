const errorMessageChecker = (err) =>
  err.response ? err.response.data.message : err.message;

export default errorMessageChecker;
