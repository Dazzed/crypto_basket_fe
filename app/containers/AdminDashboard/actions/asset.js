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
export const startEditingAsset = createAction(
  `${PREFIX}_START_EDITING_ASSET`,
  (asset) => ({ asset })
);
export const updateAsset = createAction(
  `${PREFIX}_UPDATE_ASSET_SUCESS`,
  (data, id) => ({ data, id })
);
export const fetchAssetSuccess = createAction(
  `${PREFIX}_FETCH_ASSET_SUCESS`,
  (asset) => ({ asset })
);