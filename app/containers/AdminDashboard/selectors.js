import { createSelector } from 'reselect';

const selectAdminDashboardDomain = (state) => state.adminDashboard;

const makeSelectAdminDashboard = () => createSelector(
  selectAdminDashboardDomain,
  (substate) => substate
);

export default makeSelectAdminDashboard;
export {
  selectAdminDashboardDomain,
};
