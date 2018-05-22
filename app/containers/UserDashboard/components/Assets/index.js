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
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import {  } from 'reactstrap';
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

import SettingsModal from '../../../../components/SettingsModal';
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

export default class AssetsPage extends Component {
  constructor(props){
    super(props);
    this.state = {activeTab: 'profile', modalOpen: false, modalField: null, dropdownOpen: false, showIn: 'usd'};
  }
  componentWillMount() {

  }
  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  resetPassword = () => {
    console.log('resetting pass', this.props);
    this.props.resetUserPassword(this.props.adminDashboard.editingUser.email, this.props.showToastSuccess, this.props.showToastError);
  }

  archiveUser = () => {
    this.props.archiveUser(this.props.adminDashboard.editingUser.id);
  }

  submitModal = (data) => {
    this.setState({modalOpen: false});
    if(this.state.modalField==='archive' || this.state.modalField==='activate'){
      this.props.archiveUser(this.props.adminDashboard.editingUser.id);
    }else{
      this.props.updateUser(data, this.props.adminDashboard.editingUser.id);
    }
  }
  archiveUserModal = () => {
    this.setState({modalField: this.props.adminDashboard.editingUser.isDeleted ? "activate" : "archive", modalOpen: true});
  }

  changeVerificationModal = () => {
    this.setState({modalField: "verificationStatus", modalOpen: true});
  }

  changeEmailModal = () => {
    this.setState({modalField: "email", modalOpen: true});
  }

  changeUsernameModal = () => {
    this.setState({modalField: "username", modalOpen: true});
  }

  changeStateModal = () => {
    this.setState({modalField: "state", modalOpen: true});
  }

  changeCountryModal = () => {
    this.setState({modalField: "country", modalOpen: true});
  }

  closeModal = () => {
    this.setState({modalOpen: false});
  }

  toggle = () => {
    this.setState({dropdownOpen: !this.state.dropdownOpen});
  }

  showUSD = () => {
    this.setState({showIn: 'usd'});
  }

  showBTC = () => {
    this.setState({showIn: 'btc'});
  }

  showETH = () => {
    this.setState({showIn: 'eth'});
  }

  render() {
    const user = this.props.globalData.currentUser;
    const walletValues = _.reduce((user && user.wallets) || [],  (accumulator, elem) => {
      accumulator[elem.assetId] = elem.balance;
      if(elem[this.state.showIn + 'Price']){
        accumulator.total += parseFloat(elem[this.state.showIn + 'Price']);
      }
      return accumulator;
    },{ total: 0 })
    console.log('rendering assets page', walletValues);
    return (
      <div className="col-12 col-lg-9 col-md-12 h-100 content_section">
      <SettingsModal onSubmit={this.submitModal} closeModal={this.closeModal} fieldName={this.state.modalField ? this.state.modalField : "email"} isOpen={this.state.modalOpen}/>
        <div className="row">
          <div className="col-md-8 col-4">
            <div className="dashboard-heading">Total Balance </div>
            <div className="dashboard-value">${walletValues.total} {this.state.showIn.toUpperCase()}</div>
          </div>
        </div>
        <div className="row mt-3  bg_white clear-top-padding">
          <div className="assets-wrapper">
            <Row>
              <Col className="assets-header left">My Portfolio</Col>
              <Col className="assets-dropdown right">
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="assets-dropdown">
                  <DropdownToggle caret className="dropdown-toggle">
                    Show in {this.state.showIn.toUpperCase()}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={this.showUSD}>USD</DropdownItem>
                    <DropdownItem onClick={this.showBTC}>BTC</DropdownItem>
                    <DropdownItem onClick={this.showETH}>ETH</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </Col>

            </Row>
            <div className="asset-list">
              {_.map(user.wallets, wallet => {
                if(wallet.assetId!=='btc' && wallet.assetId!=='eth'){
                  console.log('skipping wallet', wallet.assetId);
                  return null;
                }
                return (
                  <Row className="asset-content-row bordered">
                    <Col sm={{ size: 1, order: 1, offset: 0 }}>
                    <img src={iconMap[wallet.assetId]} className="crypto-icon"/>
                    </Col>
                    <Col sm={{ size: 2, order: 2, offset: 0 }} className="asset-row-name left">
                      {cryptoNames[wallet.assetId]}
                    </Col>
                    <Col sm={{ size: 3, order: 3, offset: 3 }} className="asset-row-usd right"> 
                      ${round(wallet[this.state.showIn + 'Price'], 2)} {this.state.showIn.toUpperCase()}
                    </Col>
                    <Col sm={{ size: 3, order: 4, offset: 0 }} className="asset-row-btc"> 
                      {round(wallet.balance, 3)} {wallet.assetId.toUpperCase()}
                    </Col>
                  </Row>);
              })}
            </div>
            <div className="assets-header">Investable Assets</div>
            <div className="asset-list">
              {_.map(user.wallets, wallet => {
                if(wallet.assetId==='btc' || wallet.assetId==='eth'){
                  return null;
                }
                return (
                  <Row className="asset-content-row bordered">
                    <Col sm={{ size: 1, order: 1, offset: 0 }}>
                    <img src={iconMap[wallet.assetId]} className="crypto-icon"/>
                    </Col>
                    <Col sm={{ size: 2, order: 2, offset: 0 }} className="asset-row-name left">
                      {cryptoNames[wallet.assetId]}
                    </Col>
                    <Col sm={{ size: 3, order: 3, offset: 3 }} className="asset-row-usd right"> 
                      ${round(wallet[this.state.showIn + 'Price'], 2)} {this.state.showIn.toUpperCase()}
                    </Col>
                    <Col sm={{ size: 3, order: 4, offset: 0 }} className="asset-row-btc"> 
                      {round(wallet.balance, 3)} {wallet.assetId.toUpperCase()}
                    </Col>
                  </Row>);
              })}
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}

AssetsPage.propTypes = {
  globalData: PropTypes.object.isRequired,
  adminDashboard: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isSuperAdmin: PropTypes.bool.isRequired,
  startEnablingTFAAdmin: PropTypes.func.isRequired,
  openOtpModal: PropTypes.func.isRequired,
  showToastSuccess: PropTypes.func.isRequired,
  showToastError: PropTypes.func.isRequired,
  startCreatingAdmin: PropTypes.func.isRequired
};
