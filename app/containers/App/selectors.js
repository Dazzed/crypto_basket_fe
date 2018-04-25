import { createSelector } from 'reselect';

const selectRoute = (state) => state.route;
const selectGlobal = (state) => state.globalData;

export const makeSelectLocation = () => createSelector(
  selectRoute,
  routeState => routeState.location
);

export const makeSelectGlobal = () => createSelector(
  selectGlobal,
  substate => substate
);

export const isAdmin = () => createSelector(
  state => state,
  state => {
    if (!state.globalData.currentUser || !state.globalData.currentUser.roleMapping) {
      return false;
    }
    const {
      currentUser: {
        roleMapping: {
          role: {
            name
          }
        }
      }
    } = state.globalData;
    return name === 'admin';
  }
);
