const checkValidation = () => {
  let isValid = false;
  if (
    localStorage.getItem("token") &&
    new Date(localStorage.getItem("expiresIn")) > new Date()
  ) {
    isValid = true;
  }
  return isValid;
};

export default checkValidation;
