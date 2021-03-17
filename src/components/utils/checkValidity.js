export const checkValidity = (type, value) => {
  let valid;
  switch (type) {
    case 'text':
      valid = value !== '';
      break;

    case 'email':
      valid = value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
      break;

    case 'password':
      valid = value.length >= 5;
      break;

    default:
      return;
  }
  return valid;
};
