export const normalizeBTCValue = value => {
  const {
    adminDashboard: {
      assets: allAssets
    }
  } = this.props;
  if (allAssets.length === 0) {
    return value;
  }
  const {
    btcAssetObject
  } = this.state;

};

export const normalizeEthValue = value => {
  const {
    adminDashboard: {
      assets: allAssets
    }
  } = this.props;
  if (allAssets.length === 0) {
    return value;
  }
};