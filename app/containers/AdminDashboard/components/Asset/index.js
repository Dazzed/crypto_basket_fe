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
import {  } from 'reactstrap';
import _ from 'lodash';
import classnames from 'classnames';

import SettingsModal from '../../../../components/SettingsModal';

function round(number, precision) {
  var shift = function (number, precision) {
    var numArray = ("" + number).split("e");
    return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
  };
  return shift(Math.round(shift(number, +precision)), -precision);
}

export default class Asset extends Component {
  constructor(props){
    super(props);
    this.state = {activeTab: 'profile', modalOpen: false, modalField: null};
  }
  componentWillMount() {

  }

  resetPassword = () => {
    // console.log('resetting pass', this.props);
    // this.props.resetUserPassword(this.props.adminDashboard.editingUser.email, this.props.showToastSuccess, this.props.showToastError);
  }

  archiveUser = () => {
    // this.props.archiveUser(this.props.adminDashboard.editingUser.id);
  }

  submitModal = (data) => {
    this.setState({modalOpen: false});
    if(this.state.modalField==='available' || this.state.modalField==='unavailable'){
      console.log('setting hidden to', !this.props.adminDashboard.editingAsset.hidden);
      this.props.updateAsset({hidden: !this.props.adminDashboard.editingAsset.hidden}, this.props.adminDashboard.editingAsset.id);
    }else{
      console.log('data', data);
      data[this.state.modalField] = parseFloat(data[this.state.modalField]);
      this.props.updateAsset(data, this.props.adminDashboard.editingAsset.id);
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
  setUnavailableModal = () => {
    this.setState({modalField: this.props.adminDashboard.editingUser.hidden ? "available" : "unavailable", modalOpen: true});
  }

  changeMinPurchase = () => {
    this.setState({modalField: "minPurchaseAmount", modalOpen: true});
  }

  changeMaxPurchase = () => {
    this.setState({modalField: "maxPurchaseAmount", modalOpen: true});
  }

  changeBuyMargin = () => {
    this.setState({modalField: "buyMargin", modalOpen: true});
  }

  changeSaleMargin = () => {
    this.setState({modalField: "saleMargin", modalOpen: true});
  }

  changeCountryModal = () => {
    // this.setState({modalField: "country", modalOpen: true});
  }

  closeModal = () => {
    this.setState({modalOpen: false});
  }
  render() {
    // console.log('user', this.props.adminDashboard.editingUser);
    const asset = this.props.adminDashboard.editingAsset;
    console.log('asset', asset);
    const exchangeRate = asset.totalValueInUSD/parseFloat(asset.quantity);
    return (
      <div className="col-12 col-lg-9 col-md-12 h-100 content_section">
      <SettingsModal onSubmit={this.submitModal} closeModal={this.closeModal} fieldName={this.state.modalField} isOpen={this.state.modalOpen}/>
        <div className="row">
          <div className="col-md-8 col-4">
            <h2 className="p-4">{asset.name} ({asset.ticker.toUpperCase()})</h2>
          </div>
          <div className="col-md-2 col-4 mt-3">
            Status: Available
          </div>
          <div className="col-md-2 col-4 mt-3">
            <button type="button" className="btn-create-admin w-100" onClick={this.setUnavailableModal}>Set {asset.hidden ? "Available" : "Unavailable"}</button>
          </div>
        </div>
        <div className="row mt-3  bg_white clear-top-padding">
          <div className="asset-wrapper">
            <Row className="asset-content-row">
              <Col sm={{ size: 3, order: 1, offset: 0 }} className="left">
              Available for Purchase
              </Col>
              <Col sm={{ size: 8, order: 2, offset: 0 }} className="right">
                {asset.availableQuantityWithCommunity}
              </Col>
              <Col sm={{ size: 1, order: 3, offset: 0 }}> 
                 
              </Col>
            </Row>
            <Row className="asset-content-row">
              <Col sm={{ size: 3, order: 1, offset: 0 }} className="left">
              Current Exchange Rate
              </Col>
              <Col sm={{ size: 8, order: 2, offset: 0 }} className="right">
                {exchangeRate}
              </Col>
              <Col sm={{ size: 1, order: 3, offset: 0 }}> 
                
              </Col>
            </Row>
            <Row className="asset-content-row">
              <Col sm={{ size: 3, order: 1, offset: 0 }} className="left">
              Held By Community
              </Col>
              <Col sm={{ size: 8, order: 2, offset: 0 }} className="right">
                {asset.communityValueUSD}
              </Col>
              <Col sm={{ size: 1, order: 3, offset: 0 }}> 
                
              </Col>
            </Row>
            <Row className="asset-content-row">
              <Col sm={{ size: 3, order: 1, offset: 0 }} className="left">
              Held By Melotic
              </Col>
              <Col sm={{ size: 8, order: 2, offset: 0 }} className="right">
                {asset.quantity}
              </Col>
              <Col sm={{ size: 1, order: 3, offset: 0 }}> 
                
              </Col>
            </Row>
            <Row className="asset-content-row">
              <Col sm={{ size: 3, order: 1, offset: 0 }} className="left">
              Minimum Purchase
              </Col>
              <Col sm={{ size: 8, order: 2, offset: 0 }} className="right">
                {asset.minPurchaseAmount}
              </Col>
              <Col sm={{ size: 1, order: 3, offset: 0 }}> 
                <Button onClick={this.changeMinPurchase}>Change</Button>
              </Col>
            </Row>
            <Row className="asset-content-row">
              <Col sm={{ size: 3, order: 1, offset: 0 }} className="left">
              Maximum Purchase
              </Col>
              <Col sm={{ size: 8, order: 2, offset: 0 }} className="right">
                {asset.maxPurchaseAmount}
              </Col>
              <Col sm={{ size: 1, order: 3, offset: 0 }}> 
                <Button onClick={this.changeMaxPurchase}>Change</Button>
              </Col>
            </Row>
            <Row className="asset-content-row">
              <Col sm={{ size: 3, order: 1, offset: 0 }} className="left">
              Buy Margin
              </Col>
              <Col sm={{ size: 8, order: 2, offset: 0 }} className="right">
                {asset.buyMargin*100}
              </Col>
              <Col sm={{ size: 1, order: 3, offset: 0 }}> 
                <Button onClick={this.changeBuyMargin}>Change</Button>
              </Col>
            </Row>
            <Row className="asset-content-row">
              <Col sm={{ size: 3, order: 1, offset: 0 }} className="left">
              Sell Margin
              </Col>
              <Col sm={{ size: 8, order: 2, offset: 0 }} className="right">
                {asset.saleMargin*100}
              </Col>
              <Col sm={{ size: 1, order: 3, offset: 0 }}> 
                <Button onClick={this.changeSaleMargin}>Change</Button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

Asset.propTypes = {
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
