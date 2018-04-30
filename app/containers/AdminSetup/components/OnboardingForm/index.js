import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import RenderField from 'components/RenderField';
import Loading from 'components/Loading';
import validate from './validate';
import asyncValidate from './asyncValidate';

class OnboardingForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    adminSetup: PropTypes.object.isRequired
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-sm-8 col-10 col-lg-5 m-auto">
            <h1 className="text-center w-100">Finish setting up your admin account</h1>
            <form onSubmit={handleSubmit}>
              <div className="row mt-5">
                <div className="col-sm-12">
                  <Field
                    name="username"
                    type="text"
                    component={RenderField}
                    label="Username"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-sm-12 input-group">
                  <Field
                    name="password"
                    type="password"
                    component={RenderField}
                    label="Password"
                    placeholder=""
                  />
                </div>
              </div>
              {
                this.props.adminSetup.hasSubmittedFormOne &&
                  <div className="row mt-2">
                    <div className="col-sm-12 input-group">
                      <Field
                        name="otp"
                        type="otp"
                        component={RenderField}
                        label="OTP"
                        placeholder=""
                      />
                    </div>
                  </div>
              }

              <div className="row mt-4">
                <div className="col-sm-12">
                  {this.props.adminSetup.isCompletingOnboarding ?
                    <Loading /> :
                    <button type="submit" className="btn-create-register btn-block">
                      Create Account
                  </button>}
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
  form: 'admin_onboarding',
  validate,
  asyncValidate
})(OnboardingForm));
