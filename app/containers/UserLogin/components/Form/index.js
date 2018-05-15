import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

import RenderField from 'components/RenderField';
import Loading from 'components/Loading';
import validate from './validate';

class LoginForm extends Component {
  static propTypes = {
    isLoggingIn: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    loginFailed: PropTypes.bool.isRequired
  }
  constructor() {
    super();
    this.state = { captcha: false };
  }

  render() {
    const { handleSubmit, pristine, loginFailed, tfaRequired } = this.props;
    const onChange = e => {
      this.setState({ captcha: true });
    };
    console.log('loginfailed', loginFailed, 'captcha', this.state.captcha);
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
                  <Link className="forgot_link mt-2" to="/forgot_username">
                    Forgot your username?
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
                  <Link className="forgot_link mt-2" to="/reset">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              {(tfaRequired) ? (
                <div className="row mt-3">
                  <div className="col-sm-12">
                    <Field
                      name="otp"
                      type="string"
                      component={RenderField}
                      label="Google Authenticator Code"
                      placeholder="Google Auth Code"
                    />
                  </div>
                </div>
              ) : null}

              {loginFailed ? (
                <div className="row mt-4">
                  <div className="col-sm-12 centered">
                    <ReCAPTCHA sitekey="6LfsHVYUAAAAAMtUy6xcuz01uVkAP92zGXtjsstu" onChange={onChange} className="captcha" />
                  </div>
                </div>
              ) : null}
              <div className="row mt-4">
                <div className="col-sm-12">
                  {this.props.isLoggingIn ?
                    <Loading insideModal floatLeft /> :
                    <button
                      type="submit"
                      disabled={loginFailed && !this.state.captcha}
                      className={`btn-create-register ${pristine && 'btn-disabled'} ${(loginFailed && !this.state.captcha) && 'btn-disabled'}`}
                    >
                      Sign In
                  </button>}
                </div>
              </div>
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
  destroyOnUnmount: false,
  validate
})(LoginForm));
