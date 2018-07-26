import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import StepThreeImage from 'img/enrollment_step_3.png';

export default class StepTwo extends Component {
  static propTypes = {
    toggleEmailVerifiedFlag: PropTypes.func.isRequired
  };

  componentWillUnmount () {
    this.props.toggleEmailVerifiedFlag();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-sm-8 col-10 col-lg-5 m-auto">
            <h1 className="text-center w-100 success_acc_create">Your account has been confirmed</h1>
            <img src={StepThreeImage} className="mt-3 img-fluid" />
            <div className="row mt-5">
              <div className="col-sm-12">
                <p className="acc_create_text">
                  You can now log into Melotic using you account information.
                  <br /> Thanks for signing up!
                </p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-sm-12">
                <Link className="btn btn-create-register" to="/user_login">
                  Cool, lets login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
