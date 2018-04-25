import { createSelector } from 'reselect';

const selectUserLoginDomain = (state) => state.userLogin;

const makeSelectUserLogin = () => createSelector(
  selectUserLoginDomain,
  (substate) => substate
);

export default makeSelectUserLogin;
export {
  selectUserLoginDomain,
};
