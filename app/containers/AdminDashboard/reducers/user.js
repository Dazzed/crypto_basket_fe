import {
  fetchUsers,
  fetchUsersSuccess,
  fetchUsersError
} from '../actions/user';

export const userReducer = {
  [fetchUsers]: state => ({
    ...state,
    fetchingUsers: true
  }),
  [fetchUsersSuccess]: (state, action) => ({
    ...state,
    fetchingUsers: false,
    users: action.users
  }),
  [fetchUsersError]: state => ({
    ...state,
    fetchingUsers: false
  })
};
