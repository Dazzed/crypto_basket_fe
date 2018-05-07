import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import RenderField from 'components/RenderField';
import validate from './validate';

const resetHeading = "Forgot your password?";
const setPasswordHeading = "Reset your password";
const forgotUsernameHeading = "Forgot your username?"
const resetPrompt = "Enter your email address below and we will send you\na link to reset your password";
const setPrompt = "Please enter a new password below.";
const forgotPrompt = "Enter your email address below and we will send you\n your username";

class PasswordResetForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-sm-8 col-10 col-lg-5 m-auto">
            <h1 className="text-center w-100">{this.props.userName ? forgotUsernameHeading : (this.props.isReset ? resetHeading : setPasswordHeading)}</h1>
            <h2 className="text-center w-100">{this.props.userName ? forgotPrompt : (this.props.isReset ? resetPrompt : setPrompt)}</h2>
            <form onSubmit={handleSubmit}>
              <div className="row mt-3">
                <div className="col-sm-12">
                  <Field
                    name={this.props.isReset ? "email" : "newPassword"}
                    type={this.props.isReset ? "text" : "password"}
                    component={RenderField}
                    label={this.props.isReset ? "Email Address" : "New Password"}
                    placeholder=""
                  />
                </div>
              </div>
              {!this.props.isReset ? (<div className="row mt-3">
                <div className="col-sm-12">
                  <Field
                    name="confirmPassword"
                    type={this.props.isReset ? "text" : "password"}
                    component={RenderField}
                    label="Repeat Password"
                    placeholder=""
                  />
                </div>
              </div>) : null}
              <div className="row mt-3">
                <div className="col-sm-12">
                    <button type="submit" className="btn-create-register btn-block">
                      Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default (reduxForm({
  form: 'password_reset',
  validate
})(PasswordResetForm));