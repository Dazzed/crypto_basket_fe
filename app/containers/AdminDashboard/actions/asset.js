import { createAction } from 'redux-act';

export const PREFIX = 'APP_ADMIN_DASHBOARD';

export const fetchAssets = createAction(
  `${PREFIX}_FETCH_ASSETS`
);
export const fetchAssetsSuccess = createAction(
  `${PREFIX}_FETCH_ASSETS_SUCCESS`,
  (assets) => ({ assets })
);
export const fetchAssetsError = createAction(
  `${PREFIX}_FETCH_ASSETS_ERROR`
);