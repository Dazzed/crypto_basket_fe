import { createAction } from 'redux-act';

export const PREFIX = 'APP_USER_DASHBOARD';

export const cancelOperation = createAction(
  `${PREFIX}_CANCEL_OPERATION`
);
// actions for Settings Page
export const startPatchingUser = createAction(
  `${PREFIX}_START_PATCHING_USER`,
  user => user
);

export const performPatchingUser = createAction(
  `${PREFIX}_PERFORM_PATCHING_USER`,
  (user, values, toastSuccessCallBack, toastErrorCallBack) => ({
    user,
    values,
    toastSuccessCallBack,
    toastErrorCallBack
  })
);

export const patchUserSuccess = createAction(
  `${PREFIX}_PATCH_USER_SUCCESS`,
  user => user
);

export const patchUserError = createAction(
  `${PREFIX}_PATCH_USER_ERROR`
);

export const performUploadingIdentity = createAction(
  `${PREFIX}_PERFORM_UPLOADING_IDENTITY`,
  (file, toastSuccessCallBack, toastErrorCallBack) => ({
    file, toastSuccessCallBack, toastErrorCallBack
  })
);

export const uploadIdentitySuccess = createAction(
  `${PREFIX}_UPLOAD_IDENTITY_SUCCESS`,
  data => data
);

export const uploadIdentityError = createAction(
  `${PREFIX}_UPLOAD_IDENTITY_ERROR`
);

export const performUploadingProof = createAction(
  `${PREFIX}_PERFORM_UPLOADING_PROOF`,
  (file, toastSuccessCallBack, toastErrorCallBack) => ({
    file, toastSuccessCallBack, toastErrorCallBack
  })
);

export const uploadProofSuccess = createAction(
  `${PREFIX}_UPLOAD_PROOF_SUCCESS`,
  data => data
);

export const uploadProofError = createAction(
  `${PREFIX}_UPLOAD_PROOF_ERROR`,
);

// End actions for Settings Page

export const getUser = createAction(
  `${PREFIX}_GETTING_USER`,
  user => user
);

export const fetchAllAssets = createAction(
  `${PREFIX}_FETCH_ALL_ASSETS`,
  (toastSuccessCallBack, toastErrorCallBack) => ({
    toastSuccessCallBack,
    toastErrorCallBack
  })
);

export const fetchAllAssetsSuccess = createAction(
  `${PREFIX}_FETCH_ALL_ASSETS_SUCCESS`
);

export const fetchAllAssetsError = createAction(
  `${PREFIX}_FETCH_ALL_ASSETS_ERROR`
);

export const openDepositModal = createAction(
  `${PREFIX}_OPEN_DEPOSIT_MODEL`,
  currency => currency
);

export const closeDepositModal = createAction(
  `${PREFIX}_CLOSE_DEPOSIT_MODEL`,
);
