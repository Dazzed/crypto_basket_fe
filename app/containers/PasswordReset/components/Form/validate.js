
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

export default values => {
  const errors = {};
  const passwordValidation = validatePassword(values.newPassword);
  if (passwordValidation.error) {
    errors['newPassword'] = passwordValidation.message;
  }
  if(values.newPassword!==values.confirmPassword)
      errors['confirmPassword'] = 'Passwords must match';
  return errors;
};
