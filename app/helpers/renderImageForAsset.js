import React from 'react';

import BtcIcon from 'img/icon_btc.png';
import ETHIcon from 'img/icon_eth.png';
import XRPIcon from 'img/icon_xrp.png';
import BCHIcon from 'img/icon_bch.png';
import LTCIcon from 'img/icon_ltc.png';
import XLMIcon from 'img/icon_xlm.png';
import XMRIcon from 'img/icon_xmr.png';
import ZECIcon from 'img/icon_zec.png';
import DASHIcon from 'img/icon_dash.png';
import ADAIcon from 'img/icon_ada.png';

export default ticker => {
  if (!ticker) {
    return <img src={BtcIcon} className="activity_img" />;
  }
  switch (ticker.toLowerCase()) {
    case 'btc':
      return <img src={BtcIcon} className="activity_img" />;
    case 'eth':
      return <img src={ETHIcon} className="activity_img" />;
    case 'xrp':
      return <img src={XRPIcon} className="activity_img" />;
    case 'bch':
      return <img src={BCHIcon} className="activity_img" />;
    case 'ltc':
      return <img src={LTCIcon} className="activity_img" />;
    case 'xlm':
      return <img src={XLMIcon} className="activity_img" />;
    case 'xmr':
      return <img src={XMRIcon} className="activity_img" />;
    case 'zec':
      return <img src={ZECIcon} className="activity_img" />;
    case 'dash':
      return <img src={DASHIcon} className="activity_img" />;
    case 'ada':
      return <img src={ADAIcon} className="activity_img" />;
    default:
      return <img src={BtcIcon} className="activity_img" />;
  }
}