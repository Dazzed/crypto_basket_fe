export default values => {
  const errors = {};
  const REQUIRED_PARAMS = [
    'firstName',
    'lastName',
    'username',
    'email'
  ];
  REQUIRED_PARAMS.forEach(param => {
    if (!values[param]) {
      errors[param] = 'Required';
    } else if (values[param] && !String(values[param]).trim()) {
      errors[param] = 'Required';
    }
  });
  return errors;
};
