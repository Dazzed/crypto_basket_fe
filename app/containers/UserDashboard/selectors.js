import { createSelector } from 'reselect';

const selectUserDashboardDomain = (state) => state.userDashboard;

const makeSelectUserDashboard = () => createSelector(
  selectUserDashboardDomain,
  (substate) => substate
);

export default makeSelectUserDashboard;
export {
  selectUserDashboardDomain,
};
