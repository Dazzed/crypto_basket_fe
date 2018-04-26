export default values => {
  const errors = {};
  const REQUIRED_PARAMS = [
    'email',
    'password'
  ];
  REQUIRED_PARAMS.forEach(param => {
    if (!values[param]) {
      errors[param] = `${param === 'email' ? 'User Name/Email' : 'Password'} cannot be empty`;
    } else if (values[param] && !String(values[param]).trim()) {
      errors[param] = `${param === 'email' ? 'User Name/Email' : 'Password'} cannot be empty`;
    }
  });
  return errors;
};
