import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import RenderField from 'components/RenderField';
import Loading from 'components/Loading';
import validate from './validate';
import Recaptcha from 'react-recaptcha';

class LoginForm extends Component {
  static propTypes = {
    isLoggingIn: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequiredm,
    loginFailed: PropTypes.bool.isRequired
  }

  render() {
    const { handleSubmit, pristine, loginFailed} = this.props;
    console.log('loginfailed', loginFailed);
    return (
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-sm-8 col-10 col-lg-4 m-auto">
            <form onSubmit={handleSubmit}>
              <h1 className="text-center w-100">Welcome back to Melotic</h1>
              <div className="row mt-5">
                <div className="col-sm-12">
                  <Field
                    name="email"
                    type="text"
                    component={RenderField}
                    label="Username or Email Address"
                    placeholder="Username or Email Address"
                  />
                </div>
                <div className="col-sm-12">
                  <Link className="forgot_link mt-2" to="/">
                    Forgot your email address?
                  </Link>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-sm-12 input-group">
                  <Field
                    name="password"
                    type="password"
                    component={RenderField}
                    label="Password"
                    placeholder="Password"
                  />
                </div>
                <div className="col-sm-12">
                  <Link className="forgot_link mt-2" to="/">
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-sm-12">
                  {this.props.isLoggingIn ?
                    <Loading insideModal floatLeft /> :
                    <button
                      type="submit"
                      className={`btn-create-register ${pristine && 'btn-disabled'}`}
                    >
                      Cool,Lets log in
                  </button>}
                </div>
              </div>
              {loginFailed ? <Recaptcha sitekey="6LfsHVYUAAAAAMtUy6xcuz01uVkAP92zGXtjsstu"/> : null}
              <div className="row mt-3">
                <div className="col-sm-12">
                  <p>
                    Don't have an account yet?
                    <Link className="signin_text ml-3" to="/user_register">
                      Create an account
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
  form: 'user_login',
  validate
})(LoginForm));
