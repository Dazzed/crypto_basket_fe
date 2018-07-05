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
import moment from 'moment';
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
import Activity from './components/Activity';
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

export default class User extends Component {
  constructor(props) {
    super(props);
    const {
      match: {
        params: {
          id: targetUserId
        }
      }
    } = props;
    this.state = {
      activeTab: 'profile',
      modalOpen: false,
      modalField: null,
      targetUserId
    };
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
    this.setState({ modalOpen: false });
    if (this.state.modalField === 'archive' || this.state.modalField === 'activate') {
      this.props.archiveUser(this.props.adminDashboard.editingUser.id);
    } else if (this.state.modalField === 'transferBTC' || this.state.modalField === 'transferETH') {
      console.log('in transfer if');
      this.props.transferToUser(this.props.adminDashboard.editingUser.id, this.state.modalField === 'transferBTC' ? 'btc' : 'eth', this.state.modalField === 'transferBTC' ? data.transferBTC : data.transferETH, data.OTP);
    } else {
      this.props.updateUser(data, this.props.adminDashboard.editingUser.id);
    }
  }
  // email: "Email",
  // archive: "Archive",
  // activate: "Activate",
  // withdrawal: "Withdrawal",
  // username: "Username",
  // state: "State of Residence",
  // dob: "Date of Birth",
  // country: "Country of Residence",
  // verificationStatus: "Verification Status"
  archiveUserModal = () => {
    this.setState({ modalField: this.props.adminDashboard.editingUser.isDeleted ? "activate" : "archive", modalOpen: true });
  }

  changeVerificationModal = () => {
    this.setState({ modalField: "verificationStatus", modalOpen: true });
  }

  changeEmailModal = () => {
    this.setState({ modalField: "email", modalOpen: true });
  }

  changeUsernameModal = () => {
    this.setState({ modalField: "username", modalOpen: true });
  }

  changeStateModal = () => {
    this.setState({ modalField: "state", modalOpen: true });
  }

  changeDateModal = () => {
    this.setState({ modalField: "dob", modalOpen: true });
  }

  changeCountryModal = () => {
    this.setState({ modalField: "country", modalOpen: true });
  }

  changeWithLimitBTC = () => {
    this.setState({ modalField: "withdrawLimitBTC", modalOpen: true });
  }

  changeWithLimitETH = () => {
    this.setState({ modalField: "withdrawLimitETH", modalOpen: true });
  }


  transferBTC = () => {
    this.setState({ modalField: "transferBTC", modalOpen: true });
  }

  transferETH = () => {
    this.setState({ modalField: "transferETH", modalOpen: true });
  }

  closeModal = () => {
    this.setState({ modalOpen: false });
  }
  render() {
    const walletValues = _.reduce((this.props.adminDashboard.editingUser && this.props.adminDashboard.editingUser.wallets) || [], (accumulator, elem) => {
      accumulator[elem.assetId] = elem.balance;
      return accumulator;
    }, {});
    const user = this.props.adminDashboard.editingUser;
    const role = this.props.globalData.currentUser.roleMapping && this.props.globalData.currentUser.roleMapping.role ? this.props.globalData.currentUser.roleMapping.role.name : "";
    const isSuperAdmin = (role === 'super_admin');
    return (
      <div className="col-12 col-lg-9 col-md-12 h-100 content_section">
        <SettingsModal onSubmit={this.submitModal} closeModal={this.closeModal} fieldName={this.state.modalField ? this.state.modalField : "email"} isOpen={this.state.modalOpen} />
        <div className="row">
          <div className="col-md-8 col-4">
            <h2 className="p-4">{user.firstName} {user.lastName}</h2>
          </div>
          <div className="col-md-2 col-4 mt-3">
            <button type="button" className="btn-create-admin w-100" onClick={this.resetPassword}>Reset Password</button>
          </div>
          <div className="col-md-2 col-4 mt-3">
            <button type="button" className="btn-create-admin w-100" onClick={this.archiveUserModal}>{this.props.adminDashboard.editingUser.isDeleted ? "Activate" : "Archive"} User</button>
          </div>
        </div>
        <Nav tabs className="row col-md-4 tab-nav-container">
          <NavItem className="col-md-4 tab-nav-item ">
            <NavLink
              className={classnames({ active: this.state.activeTab === 'profile' })}
              onClick={() => { this.toggle('profile'); }}
            >
              Profile
              </NavLink>
          </NavItem>
          <NavItem className="col-md-4 tab-nav-item ">
            <NavLink
              className={classnames({ active: this.state.activeTab === 'assets' })}
              onClick={() => { this.toggle('assets'); }}
            >
              Assets
              </NavLink>
          </NavItem>
          <NavItem className="col-md-4 tab-nav-item ">
            <NavLink
              className={classnames({ active: this.state.activeTab === 'activity' })}
              onClick={() => { this.toggle('activity'); }}
            >
              Activity
              </NavLink>
          </NavItem>
        </Nav>
        <div className="row mt-3  bg_white clear-top-padding">
          <TabContent activeTab={this.state.activeTab} className="tab-content-container">
            <TabPane tabId="profile">
              <div className="profile-wrapper">
                <Row className="tab-content-row">
                  <Col sm={{ size: 2, order: 1, offset: 0 }} className="left">
                    Username
                    </Col>
                  <Col sm={{ size: 8, order: 2, offset: 0 }} className="right">
                    {user.username}
                  </Col>
                  <Col sm={{ size: 1, order: 3, offset: 0 }}>
                    <Button onClick={this.changeUsernameModal}>Change</Button>
                  </Col>
                </Row>
                <Row className="tab-content-row">
                  <Col sm={{ size: 3, order: 1, offset: 0 }} className="left">
                    Email Address
                    </Col>
                  <Col sm={{ size: 7, order: 2, offset: 0 }} className="right">
                    {user.email}
                  </Col>
                  <Col sm={{ size: 1, order: 3, offset: 0 }}>
                    <Button onClick={this.changeEmailModal}>Change</Button>
                  </Col>
                </Row>
                <Row className="tab-content-row">
                  <Col sm={{ size: 3, order: 1, offset: 0 }} className="left">
                    State of Residence
                    </Col>
                  <Col sm={{ size: 7, order: 2, offset: 0 }} className="right">
                    {user.state}
                  </Col>
                  <Col sm={{ size: 1, order: 3, offset: 0 }}>
                    <Button onClick={this.changeStateModal}>Change</Button>
                  </Col>
                </Row>
                <Row className="tab-content-row">
                  <Col sm={{ size: 3, order: 1, offset: 0 }} className="left">
                    Date of Birth
                    </Col>
                  <Col sm={{ size: 7, order: 2, offset: 0 }} className="right">
                    {moment(user.dob).format('YYYY-MM-DD')}
                  </Col>
                  <Col sm={{ size: 1, order: 3, offset: 0 }}>
                    <Button onClick={this.changeDateModal}>Change</Button>
                  </Col>
                </Row>
                <Row className="tab-content-row">
                  <Col sm={{ size: 2, order: 1, offset: 0 }} className="left">
                    Country
                    </Col>
                  <Col sm={{ size: 8, order: 2, offset: 0 }} className="right">
                    {user.country}
                  </Col>
                  <Col sm={{ size: 1, order: 3, offset: 0 }}>
                    <Button onClick={this.changeCountryModal}>Change</Button>
                  </Col>
                </Row>
                <Row className="tab-content-row">
                  <Col sm={{ size: 3, order: 1, offset: 0 }} className="left">
                    Verification Status
                    </Col>
                  <Col sm={{ size: 7, order: 2, offset: 0 }} className="right">
                    {user.verificationStatus}
                  </Col>
                  <Col sm={{ size: 1, order: 3, offset: 0 }}>
                    <Button onClick={this.changeVerificationModal}>Change</Button>
                  </Col>
                </Row>
                <Row className="tab-content-row">
                  <Col sm={{ size: 3, order: 1, offset: 0 }} className="left">
                    Withdrawal Limit (BTC)
                    </Col>
                  <Col sm={{ size: 7, order: 2, offset: 0 }} className="right">
                    {user.withdrawLimitBTC}
                  </Col>
                  <Col sm={{ size: 1, order: 3, offset: 0 }}>
                    <Button onClick={this.changeWithLimitBTC}>Change</Button>
                  </Col>
                </Row>
                <Row className="tab-content-row">
                  <Col sm={{ size: 3, order: 1, offset: 0 }} className="left">
                    Withdrawal Limit (ETH)
                    </Col>
                  <Col sm={{ size: 7, order: 2, offset: 0 }} className="right">
                    {user.withdrawLimitETH}
                  </Col>
                  <Col sm={{ size: 1, order: 3, offset: 0 }}>
                    <Button onClick={this.changeWithLimitETH}>Change</Button>
                  </Col>
                </Row>
                {isSuperAdmin ? (<Row className="tab-content-row">
                  <Col sm={{ size: 3, order: 1, offset: 0 }} className="left">
                    BTC Wallet Value
                    </Col>
                  <Col sm={{ size: 7, order: 2, offset: 0 }} className="right">
                    {walletValues.btc || 0}
                  </Col>
                  <Col sm={{ size: 1, order: 3, offset: 0 }}>
                    <Button onClick={this.transferBTC}>Transfer</Button>
                  </Col>
                </Row>) : null}
                {isSuperAdmin ? (<Row className="tab-content-row">
                  <Col sm={{ size: 3, order: 1, offset: 0 }} className="left">
                    ETH Wallet Value
                    </Col>
                  <Col sm={{ size: 7, order: 2, offset: 0 }} className="right">
                    {walletValues.eth || 0}
                  </Col>
                  <Col sm={{ size: 1, order: 3, offset: 0 }}>
                    <Button onClick={this.transferETH}>Transfer</Button>
                  </Col>
                </Row>) : null}
              </div>
            </TabPane>
            <TabPane tabId="assets">
              <div className="assets-wrapper">
                {_.map(user.wallets, wallet => {
                  return (
                    <Row className="asset-content-row">
                      <Col sm={{ size: 1, order: 1, offset: 0 }}>
                        <img src={iconMap[wallet.assetId]} className="crypto-icon" />
                      </Col>
                      <Col sm={{ size: 2, order: 2, offset: 0 }} className="asset-row-name left">
                        {cryptoNames[wallet.assetId]}
                      </Col>
                      <Col sm={{ size: 3, order: 3, offset: 3 }} className="asset-row-usd right">
                        ${round(wallet.usdPrice, 2)} USD
                      </Col>
                      <Col sm={{ size: 3, order: 4, offset: 0 }} className="asset-row-btc">
                        {round(wallet.balance, 3)} {wallet.assetId.toUpperCase()}
                      </Col>
                    </Row>);
                })}
              </div>
            </TabPane>
            <TabPane tabId="activity">
              <div className="assets-wrapper">
                <Activity
                  adminDashboard={this.props.adminDashboard}
                  fetchUserActivities={this.props.fetchUserActivities}
                  targetUserId={this.state.targetUserId}
                  defaultOrderByProp="id"
                  defaultActivityType="purchase"
                />
              </div>
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }
}

User.propTypes = {
  globalData: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  adminDashboard: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isSuperAdmin: PropTypes.bool.isRequired,
  startEnablingTFAAdmin: PropTypes.func.isRequired,
  openOtpModal: PropTypes.func.isRequired,
  showToastSuccess: PropTypes.func.isRequired,
  showToastError: PropTypes.func.isRequired,
  startCreatingAdmin: PropTypes.func.isRequired,
  fetchUserActivities: PropTypes.func.isRequired
};
