import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import RenderField from 'components/RenderField';
import {
  Modal, 
  Row,
  Col
} from 'reactstrap';

const fieldText = {
  email: "Please enter a new email address below, a notification email will be sent to the old address and a verification email will be sent to the new one you have provided.",
  archive: "Archiving a user will not delete their profile information, but they will no longer be able to login to the application using their credentials.",
  activate: "Activating this account will allow the user to login again to the site using these credentials.",
  withdrawal: "Please enter the maximum value you wish the user to be able to withdraw in terms of USD.",
  username: "Username must be unique, the user will not be notified of this change.",
  state: "Please enter a new State of Residence. This will not change the users current verification status, and they will not be notified of this change.",
  dob: "Please enter a new Date of Birth. This will not change the users current verification status, and they will not be notified of this change.",
  country: "Please enter a new Country. This will not change the users current verification status, and they will not be notified of this change.",
  verificationStatus: "Please update the users verification status below. Please make sure their withdrawal limit accurately reflects their new verification status before updating. An email will be triggered to the user notifying them of their status change with their current withdrawal limit.",
  unavailable: "Choosing this option will render this asset un-actionable throughout the site. Users will still be able to view the asset, but all other functionality related to it will be disabled. Please select \"Make asset unavailable\" to continue.",
  available: "Choosing this option will allow this asset to become actionable once again. Users will still now be able to trade on this asset. Please select \"Make asset available\" to continue.",
  minPurchaseAmount: "Please enter the lowest amount you wish for a user to be able to purchase of this asset.",
  maxPurchaseAmount: "Please enter the maximum amount you wish for a user to be able to purchase of this asset.",
  buyMargin: "Please enter the percentage of each purchase you wish for Melotic to collect for this asset.",
  saleMargin: "Please enter the percentage of each sale you wish for Melotic to collect for this asset.",
  quantity: "Please enter the new quantity.",
  minSaleAmount: "Please enter the lowest amount you wish for a user to be able to sell of this asset.",
  maxSaleAmount: "Please enter the maximum amount you wish for a user to be able to sell of this asset."
}

const fieldName = {
  email: "Email",
  archive: "Archive",
  activate: "Activate",
  withdrawal: "Withdrawal",
  username: "Username",
  state: "State of Residence",
  dob: "Date of Birth",
  country: "Country of Residence",
  verificationStatus: "Verification Status",
  available: "Change availability",
  unavailable: "Change availability",
  minPurchaseAmount: "Min Purchase Amount",
  maxPurchaseAmount: "Max Purchase Amount",
  buyMargin: "Buy Margin",
  saleMargin: "Sale Margin",
  quantity: "Total Quantity",
  minSaleAmount: "Min Sale Amount",
  maxSaleAmount: "Max Sale Amount"
}

const typeMap = {
  email: "text",
  archive: "text",
  activate: "text",
  withdrawal: "text",
  username: "text",
  state: "text",
  dob: "date",
  country: "text",
  verificationStatus: "text",
  available: "text",
  unavailable: "text",
  minPurchaseAmount: "text",
  maxPurchaseAmount: "text",
  buyMargin: "text",
  saleMargin: "text",
  quantity: "text"
}

class SettingsModal extends React.Component {
  constructor(){
    super();
    this.state = {verificationStatus: null};
  }
  setVerified = () => {
    this.setState({verificationStatus: "fully_verified"});
  }
  setUnVerified = () => {
    this.setState({verificationStatus: "unverified"});
  }
  setPending = () => {
    this.setState({verificationStatus: "verification_pending"});
  }
  submitVerification = () => {
    this.props.onSubmit(this.state);
  }
  render() {
    const isActivating = this.props.fieldName==='archive' || this.props.fieldName==='activate';
    const isAvailability = this.props.fieldName==='available' || this.props.fieldName==='unavailable';
      return (
        <Modal isOpen={this.props.isOpen} className={isActivating ? "archive-settings-modal" : "settings-modal"}>
        <button onClick={this.props.closeModal} type="button" className="close_google_auth close text-right ml-auto mr-3" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
          <Row  className="field-name">
            {isActivating ? `Are you sure you want to ${fieldName[this.props.fieldName]} this user?` : `Are you sure you want to change this user's ${fieldName[this.props.fieldName]}?`}
          </Row>
          <Row className="field-desc">
            {fieldText[this.props.fieldName]}
          </Row>
          {this.props.fieldName!=='verificationStatus' ? (
            <form onSubmit={this.props.handleSubmit}>
              { !isActivating && !isAvailability ? (<div className="row mt-3">
                <div className="field-wrapper"> 
                  <div className="col-sm-12">
                    <Field
                      name={this.props.fieldName}
                      type={typeMap[this.props.fieldName]}
                      component={RenderField}
                      label={fieldName[this.props.fieldName]}
                      placeholder=""
                      />
                  </div>
                </div>
              </div>) : null}
            <button
              type="submit"
              className="btn-field-wrapper"
            >
              {isActivating || isAvailability ? fieldName[this.props.fieldName] : "Submit"}
            </button>
          </form>
          ): (
            <Col>
              <Row>
                <div className="btn-wrapper">
                  <button
                    className={`btn-field-selector ${this.state.verificationStatus==='unverified' ? 'selected' : ""}`}
                    onClick={this.setUnVerified}>
                    Unverified
                  </button>
                  <button
                    className={`btn-field-selector ${this.state.verificationStatus==='fully_verified' ? 'selected' : ""}`}
                    onClick={this.setVerified}>
                    Fully Verified
                  </button>
                  <button
                    className={`btn-field-selector ${this.state.verificationStatus==='verification_pending' ? 'selected' : ""}`}
                    onClick={this.setPending}>
                    Pending Verification
                  </button>
                </div>
              </Row>
              <Row>
                <button
                  className="btn-field-wrapper"
                  onClick={this.submitVerification}>
                  Change
                </button>
              </Row>
            </Col>
          )}
          
        </Modal>
      );
    }

  
}

SettingsModal.propTypes = {
  onSubmit: PropTypes.func,
  fieldName: PropTypes.string.isRequired,
  isOpen: PropTypes.boolean,
  closeModal: PropTypes.func
};


export default (reduxForm({
  form: 'settings-form'
})(SettingsModal));

