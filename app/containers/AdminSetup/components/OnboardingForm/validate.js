function formatError(param) {
  switch (param) {
    case 'username':
      return 'Username is required';
    case 'password':
      return 'Password is required';
    default:
      return 'Error';
  }
}

function validatePassword(password) {
  const strongPassword = new RegExp('^(?=.*[0-9])^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})');
  const eightLettersLength = new RegExp('^(?=.{8,})');
  const oneLowerCase = new RegExp('^(?=.*[a-z])');
  const oneUpperCase = new RegExp('^(?=.*[A-Z])');
  const oneSymbol = new RegExp('^(?=.*[!@#\$%\^&\*])');
  const oneNumber = new RegExp('[0-9]', 'g');

  if (strongPassword.test(password)) {
    return { error: false };
  } else if (!eightLettersLength.test(password)) {
    return { error: true, message: 'Password must be atleast 8 characters in length' };
  } else if (!oneLowerCase.test(password)) {
    return { error: true, message: 'Your password must include at least one lower case letter' };
  } else if (!oneUpperCase.test(password)) {
    return { error: true, message: 'Your password must include at least one upper case letter' };
  } else if (!oneSymbol.test(password)) {
    return { error: true, message: 'Your password must include at least one symbol (!@#$%^&*)' };
  } else if (!oneNumber.test(password)) {
    return { error: true, message: 'Your password must include at least one numeric value' };
  }
  return { error: false };
}

function validateUsername(username) {
  return /^[a-zA-Z0-9]+$/.test(username);
}

export default values => {
  const errors = {};
  const REQUIRED_PARAMS = [
    'username',
    'password'
  ];
  REQUIRED_PARAMS.forEach(param => {
    if (!values[param]) {
      errors[param] = formatError(param);
    } else if (values[param] && !String(values[param]).trim()) {
      errors[param] = formatError(param);
    } else if (param === 'password') {
      const passwordValidation = validatePassword(values[param]);
      if (passwordValidation.error) {
        errors[param] = passwordValidation.message;
      }
    } else if (param === 'username') {
      if (!validateUsername(values[param])) {
        errors[param] = 'Username must contain only numbers and alphabets';
      }
    }
  });
  if (values.otp && !String(values.otp).trim()) {
    errors.otp = 'OTP is required';
  } else if (values.otp) {
    const isValid = !isNaN(values.otp);
    if (!isValid) {
      errors.otp = 'OTP must be a number';
    } else if (String(values.otp).length !== 6) {
      errors.otp = 'OTP must be six digits';
    }
  }
  return errors;
};
