import request from 'helpers/request';

const asyncValidate = async values => {
  try {
    const { username: enteredUsername } = values;
    if (!enteredUsername) {
      return;
    }
    const usernameResult = await request({
      name: `/api/users/checkUsername?username=${enteredUsername}`,
      method: 'GET'
    });
    if (usernameResult.inUse) {
      throw { username: 'That username is unavailable' };
    }
  } catch (error) {
    throw error;
  }
};

export default asyncValidate;
