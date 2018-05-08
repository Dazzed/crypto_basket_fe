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
  verificationStatus: "Please update the users verification status below. Please make sure their withdrawal limit accurately reflects their new verification status before updating. An email will be triggered to the user notifying them of their status change with their current withdrawal limit."
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
  verificationStatus: "Verification Status"
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
    const changeText = `Please enter a new ${this.props.fieldNameText}. This will not change the users current verification status, and they will not be notified of this change.`;
      return (
        <Modal isOpen={this.props.isOpen} className="settings-modal">
          <Row  className="field-name">
            Are you sure you want to change this user's {fieldName[this.props.fieldName]}?
          </Row>
          <Row className="field-desc">
            {fieldText[this.props.fieldName]}
          </Row>
          {this.props.fieldName!=='verificationStatus' ? (
            <form onSubmit={this.props.onSubmit}>
              {this.props.fieldName!=='archive' && this.props.fieldName!=='activate' ? (<div className="row mt-3">
                <div className="field-wrapper"> 
                  <div className="col-sm-12">
                    <Field
                      name={this.props.fieldName}
                      type="text"
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
              {this.props.fieldName==='archive' || this.props.fieldName==='activate' ? fieldName[this.props.fieldName] : "Submit"}
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
  onSubmit: PropTypes.object,
  fieldName: PropTypes.object.isRequired,
  isOpen: PropTypes.func,
};


export default (reduxForm({
  form: 'settings-form'
})(SettingsModal));

