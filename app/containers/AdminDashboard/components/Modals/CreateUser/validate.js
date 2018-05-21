function formatError(param) {
  if (param === 'firstName') {
    return 'First Name cannot be empty';
  } else if (param === 'lastName') {
    return 'Last Name cannot be empty';
  } else if (param === 'email') {
    return 'Email cannot be empty';
  } else if (param === 'username') {
    return 'Username cannot be empty';
  }
  return '';
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validateUsername(username) {
  return /^[a-zA-Z0-9]+$/.test(username);
}

export default values => {
  const errors = {};
  const REQUIRED_PARAMS = [
    'firstName',
    'lastName',
    'email',
    'username',
  ];
  REQUIRED_PARAMS.forEach(param => {
    if (!values[param]) {
      errors[param] = formatError(param);
    } else if (values[param] && !String(values[param]).trim()) {
      errors[param] = formatError(param);
    } else if (param === 'email') {
      if (!validateEmail(values[param])) {
        errors[param] = 'Invalid email format';
      }
    } else if (param === 'username') {
      if (!validateUsername(values[param])) {
        errors[param] = 'Username must contain only numbers and alphabets';
      }
    }
  });

  return errors;
};
