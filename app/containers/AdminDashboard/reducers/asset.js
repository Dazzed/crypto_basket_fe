import {
  fetchAssets,
  fetchAssetsSuccess,
  fetchAssetsError,
  startEditingAsset,
  fetchAssetSuccess
} from '../actions/asset';

export const assetsReducer = {
  [fetchAssets]: state => ({
    ...state,
    fetchingAssets: true
  }),
  [fetchAssetsSuccess]: (state, action) => ({
    ...state,
    fetchingAssets: false,
    assets: action.assets
  }),
  [fetchAssetsError]: state => ({
    ...state,
    fetchingAssets: false
  }),
  [startEditingAsset]: (state, action) => ({
    ...state,
    editingAsset: action.asset
  }),
  [fetchAssetSuccess]: (state, action) => ({
    ...state,
    editingAsset: action.asset
  })

};
