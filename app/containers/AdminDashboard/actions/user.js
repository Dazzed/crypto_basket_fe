import { createAction } from 'redux-act';

export const PREFIX = 'APP_ADMIN_DASHBOARD';

// actions related to admin managing users
export const updateSearch = createAction(
  `${PREFIX}_UPDATE_SEARCH`,
  (search) => ({ search })
);
export const filterVerification = createAction(
  `${PREFIX}_FILTER_VERIFICATION`,
  (verification) => ({ verification })
);
export const swapOrdering = createAction(
  `${PREFIX}_SWAP_ORDER`
);
export const fetchUsers = createAction(
  `${PREFIX}_FETCH_USERS`
);
export const fetchUsersSuccess = createAction(
  `${PREFIX}_FETCH_USERS_SUCCESS`,
  (users) => ({ users })
);
export const fetchUsersError = createAction(
  `${PREFIX}_FETCH_USERS_ERROR`
);
export const startCreatingUser = createAction(
  `${PREFIX}_START_CREATING_USER`
);
export const startEditingUser = createAction(
  `${PREFIX}_START_EDITING_USER`,
  (user) => ({ user })
);
export const fetchUser = createAction(
  `${PREFIX}_FETCH_USER`,
  (id) => ({ id })
);
export const fetchUserSuccess = createAction(
  `${PREFIX}_FETCH_USER_SUCESS`,
  (user) => ({ user })
);
export const startDeletingUser = createAction(
  `${PREFIX}_START_DELETING_USER`,
  user => user
);
export const performCreatingUser = createAction(
  `${PREFIX}_PERFORM_CREATING_USER`,
  (user, callback, toastSuccessCallBack, toastErrorCallBack) => ({
    user,
    callback,
    toastSuccessCallBack,
    toastErrorCallBack
  })
);
export const createUserSuccess = createAction(
  `${PREFIX}_CREATE_USER_SUCCESS`,
  user => user
);
export const createUserError = createAction(
  `${PREFIX}_CREATE_USER_ERROR`
);

export const changePage = createAction(
  `${PREFIX}_CHANGE_PAGE`,
  (page) => ({ page })
);
export const resetUserPassword = createAction(
  `${PREFIX}_RESET_USER_PASSWORD`,
  (email, toastSuccessCallBack, toastErrorCallBack) => ({ 
    email,
    toastSuccessCallBack,
    toastErrorCallBack
  })
);
export const archiveUser = createAction(
  `${PREFIX}_ARCHIVE_USER`,
  (id) => ({ id })
);

export const updateUser = createAction(
  `${PREFIX}_UPDATE_USER_SUCCESS`,
  (data, id) => ({ data, id })
);

export const transferToUser = createAction(
  `${PREFIX}_TRANSFER_TO_USER`,
  (id, asset, amount, otp) => ({ id, asset, amount, otp})
);
// END actions related to admin managing users
