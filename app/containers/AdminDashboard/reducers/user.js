import {
  fetchUsers,
  fetchUsersSuccess,
  fetchUsersError,
  filterVerification,
  swapOrdering,
  updateSearch, 
  changePage,
  startEditingUser,
  fetchUserSuccess
} from '../actions/user';

export const userReducer = {
  [fetchUsers]: state => ({
    ...state,
    fetchingUsers: true
  }),
  [updateSearch]: (state, action) => ({
    ...state,
    usersSearch: action.search
  }),
  [filterVerification]: (state, action) => {
    const newFilter = action.verification !== 'all' ? { where: { verificationStatus: action.verification }, order: state.usersOrder } : {order: state.usersOrder};
    return {
      ...state,
      usersFilter: newFilter,
      usersVerification: action.verification
    };
  },
  [swapOrdering]: (state) => {
    const newOrder = state.usersOrder === 'email ASC' ? 'email DESC' : 'email ASC';
    const newFilter = state.usersVerification !== 'all' ? { where: { verificationStatus: state.usersVerification }, order: newOrder } : {order: newOrder};
    return {
      ...state,
      usersFilter: newFilter,
      usersOrder: newOrder
    };
  },
  [fetchUsersSuccess]: (state, action) => ({
    ...state,
    fetchingUsers: false,
    users: action.users
  }),
  [fetchUsersError]: state => ({
    ...state,
    fetchingUsers: false
  }),
  [changePage]: (state, action) => ({
    ...state,
    usersPage: action.page
  }),
  [startEditingUser]: (state, action) => ({
    ...state,
    editingUser: action.user
  }),
  [fetchUserSuccess]: (state, action) => ({
    ...state,
    editingUser: action.user
  })
};
