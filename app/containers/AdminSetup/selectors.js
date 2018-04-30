import { createSelector } from 'reselect';

const selectAdminSetupDomain = (state) => state.adminSetup;

const makeSelectAdminSetup = () => createSelector(
  selectAdminSetupDomain,
  (substate) => substate
);

export default makeSelectAdminSetup;
export {
  selectAdminSetupDomain,
};
