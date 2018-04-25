import { createSelector } from 'reselect';

const selectUserRegisterDomain = (state) => state.userRegister;

const makeSelectUserRegister = () => createSelector(
  selectUserRegisterDomain,
  (substate) => substate
);

export default makeSelectUserRegister;
export {
  selectUserRegisterDomain,
};
