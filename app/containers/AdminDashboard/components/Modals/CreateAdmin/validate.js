function formatError(param) {
  if (param === 'firstName') {
    return 'First Name cannot be empty';
  } else if (param === 'lastName') {
    return 'Last Name cannot be empty';
  } else if (param === 'email') {
    return 'Email cannot be empty';
  }
  return '';
}

export default values => {
  const errors = {};
  const REQUIRED_PARAMS = [
    'firstName',
    'lastName',
    'email',
    'otp'
  ];
  REQUIRED_PARAMS.forEach(param => {
    if (!values[param]) {
      errors[param] = formatError(param);
    } else if (values[param] && !String(values[param]).trim()) {
      errors[param] = formatError(param);
    } else if (values[param] && param === 'otp') {
      const isValid = !isNaN(values[param]);
      if (!isValid) {
        errors[param] = 'OTP must be a number';
      } else if (String(values[param]).length !== 6) {
        errors[param] = 'OTP must be six digits';
      }
    }
  });
  return errors;
};
