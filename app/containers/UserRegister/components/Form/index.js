import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import RenderField from 'components/RenderField';
import Loading from 'components/Loading';
import StepOne from 'img/step_one.png';
import validate from './validate';
import asyncValidate from './asyncValidate';

class UserRegisterForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    isCreatingUser: PropTypes.bool.isRequired
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-sm-8 col-10 col-lg-5 m-auto">
            <h1 className="text-center w-100">Create a Melotic Account</h1>
            <img src={StepOne} className="mt-3" />
            <form onSubmit={handleSubmit}>
              <div className="row mt-3">
                <div className="col-sm-6">
                  <Field
                    name="firstName"
                    type="text"
                    component={RenderField}
                    label="Name"
                    placeholder="First Name"
                  />
                </div>
                <div className="col-sm-6">
                  <Field
                    name="lastName"
                    type="text"
                    component={RenderField}
                    label=""
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-12">
                  <Field
                    name="email"
                    type="text"
                    component={RenderField}
                    label="Email Address"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="row mt-3">
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
              <div className="row mt-3">
                <div className="col-sm-12">
                  <Field
                    name="password"
                    type="password"
                    component={RenderField}
                    label="Password"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-12">
                  {this.props.isCreatingUser ? <Loading /> :
                    <button type="submit" className="btn-create-register">
                      Create Account
                  </button>}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-12">
                  <p>Already have an account?
                  <Link className="signin_text ml-3" to="/user_login">
                      Sign in.
                  </Link>
                  </p>
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
  form: 'user_register',
  validate,
  asyncValidate
})(UserRegisterForm));
