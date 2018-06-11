import { createAction } from 'redux-act';

export const PREFIX = 'APP_MAIN_PAGE';

export const verifyAuth = createAction(`${PREFIX}_VERIFY_AUTH`);
export const authSucess = createAction(
  `${PREFIX}_AUTH_SUCCESS`,
  currentUser => currentUser
);
export const authFailure = createAction(`${PREFIX}_AUTH_FAILURE`);

export const logOutRequest = createAction(
  `${PREFIX}_LOGOUT_REQUEST`
);

export const logOutSuccess = createAction(
  `${PREFIX}_LOGOUT_SUCCESS`
);

export const logOutFailure = createAction(
  `${PREFIX}_LOGOUT_FAILURE`
);

export const openFeedbackModal = createAction(
  `${PREFIX}_OPEN_FEEDBACK_MODAL`
);

export const closeFeedbackModal = createAction(
  `${PREFIX}_CLOSE_FEEDBACK_MODAL`
);

export const submitFeedback = createAction(
  `${PREFIX}_SUBMIT_FEEDBACK`,
  data => data
);

export const submitFeedbackSuccess = createAction(
  `${PREFIX}_SUBMIT_FEEDBACK_SUCCESS`
);

export const submitFeedbackError = createAction(
  `${PREFIX}_SUBMIT_FEEDBACK_ERROR`
);
