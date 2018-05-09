import {
  fetchAssets,
  fetchAssetsSuccess,
  fetchAssetsError
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
  })
};
