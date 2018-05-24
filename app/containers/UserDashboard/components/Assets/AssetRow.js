import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { 
  TabContent, 
  TabPane, 
  Nav, 
  NavItem, 
  NavLink, 
  Card, 
  Button, 
  CardTitle, 
  CardText, 
  Row, 
  Col
} from 'reactstrap';
import _ from 'lodash';
import classnames from 'classnames';
import AdaIcon from 'img/icon_ada.png';
import BchIcon from 'img/icon_bch.png';
import BtcIcon from 'img/icon_btc.png';
import DashIcon from 'img/icon_dash.png';
import ETHIcon from 'img/icon_eth.png';
import LTCIcon from 'img/icon_ltc.png';
import XLMIcon from 'img/icon_xlm.png';
import XMRIcon from 'img/icon_xmr.png';
import XRPIcon from 'img/icon_xrp.png';
import ZecIcon from 'img/icon_zec.png';

const iconMap = {
  ada: AdaIcon,
  bch: BchIcon,
  btc: BtcIcon,
  dash: DashIcon,
  eth: ETHIcon,
  ltc: LTCIcon,
  xlm: XLMIcon,
  xmr: XMRIcon,
  xrp: XRPIcon,
  zec: ZecIcon
};

const cryptoNames = {
  ada: "Cardano",
  bch: "Bitcoin Cash",
  btc: "Bitcoin",
  dash: "Dash",
  eth: "Ethereum",
  ltc: "Litecoin",
  xlm: "Stellar",
  xmr: "Monero",
  xrp: "Ripple",
  zec: "ZCash"
};

function round(number, precision) {
  var shift = function (number, precision) {
    var numArray = ("" + number).split("e");
    return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
  };
  return shift(Math.round(shift(number, +precision)), -precision);
}

export default class AssetsRow extends Component {
  constructor(props){
    super(props);
    this.state = { rowClicked: false };
  }
  showButtons = () => {
    this.setState({rowClicked: true});
  }
  hideButtons = () => {
    this.setState({rowClicked: false});
  }
  openDeposit = () => {
    console.log('in opendeposit');
    this.props.openDepositModal(this.props.wallet.assetId);
  }
  goToBuy = () => {
    this.props.setFromAssetType(this.props.wallet.assetId === 'eth' ? 'btc' : 'eth');
    this.props.setToAssetType(this.props.wallet.assetId);
    this.props.history.push(`/dashboard/buy`);
  }
  render() {
    const { wallet, showIn, showDeposit } = this.props;
    return (
    <Row className="asset-content-row bordered" onMouseEnter={this.showButtons} onMouseLeave={this.hideButtons}>
      <Col sm={{ size: 1, order: 1, offset: 0 }}>
      <img src={iconMap[wallet.assetId]} className="crypto-icon"/>
      </Col>
      <Col sm={{ size: 2, order: 2, offset: 0 }} className="asset-row-name left">
        {cryptoNames[wallet.assetId]}
      </Col>
      <Col sm={{ size: 4, order: 3, offset: 0 }} className="asset-row-name right">
        {this.state.rowClicked ? (
          <Col>
          {showDeposit ? (<Button className="asset-row-button" onClick={this.openDeposit}>Deposit</Button>) : null}
          {showDeposit ? (<Button className="asset-row-button">Withdraw</Button>) : null}
        <Button className="asset-row-button" onClick={this.goToBuy}>Buy</Button>
        <Button className="asset-row-button">Sell</Button></Col>) : null}
      </Col>
      <Col sm={{ size: 2, order: 4, offset: 0 }} className="asset-row-usd right"> 
        ${round(wallet[showIn + 'Price'], 2)} {showIn.toUpperCase()}
      </Col>
      <Col sm={{ size: 3, order: 5, offset: 0 }} className="asset-row-btc"> 
        {round(wallet.balance, 3)} {wallet.assetId.toUpperCase()}
      </Col>
    </Row>);
  }
}

AssetsRow.propTypes = {
  wallet: PropTypes.object.isRequired,
  showIn: PropTypes.string.isRequired,
  setFromAssetType: PropTypes.func.isRequired,
  setToAssetType: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};
