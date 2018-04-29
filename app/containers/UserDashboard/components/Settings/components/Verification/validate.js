import moment from 'moment';

export default values => {
  const errors = {};
  const PARAMS = [
    'country',
    'state',
    'dob',
  ];
  PARAMS.forEach(param => {
    if (values[param] && !String(values[param]).trim()) {
      errors[param] = 'Required';
    }
    if (param === 'dob' && values[param]) {
      const isDateValid = moment(values[param]).isValid();
      if (!isDateValid) {
        errors[param] = 'Invalid Date Of Birth';
      }
    }
  });
  return errors;
};
