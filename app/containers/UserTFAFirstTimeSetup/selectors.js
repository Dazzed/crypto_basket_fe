import { createSelector } from 'reselect';

const selectUserTfafirstTimeSetupDomain = (state) => state.userTfafirstTimeSetup;

const makeSelectUserTfafirstTimeSetup = () => createSelector(
  selectUserTfafirstTimeSetupDomain,
  (substate) => substate
);

export default makeSelectUserTfafirstTimeSetup;
export {
  selectUserTfafirstTimeSetupDomain,
};
