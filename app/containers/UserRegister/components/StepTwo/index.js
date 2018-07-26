import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StepTwoImage from 'img/enrollment_step_2.png';

export default class StepTwo extends Component {
  static propTypes = {
    email: PropTypes.string.isRequired
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-sm-8 col-10 col-lg-5 m-auto">
            <h1 className="text-center w-100 success_acc_create">Your account has been created</h1>
            <img src={StepTwoImage} className="mt-3 img-fluid" />
            <div className="row mt-5">
              <div className="col-sm-12">
                <p className="acc_create_text">
                  In order to continue with logging into Melotic,
                  <br />You must first confirm your email address.
                  <br />Please click the confirmation link in the email we have sent you.
                </p>
                <p className="acc_create_email">
                  {this.props.email}
                </p>
                {/* <p className="resend_email_label">
                  Resend the verification email
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
