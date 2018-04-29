import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import RenderField from 'components/RenderField';
import Loading from 'components/Loading';
import validate from './validate';

class MyInformation extends Component {

  static propTypes = {
    globalData: PropTypes.object.isRequired,
    startEnablingTFALogin: PropTypes.func.isRequired,
    startDisablingTFALogin: PropTypes.func.isRequired,
    startEnablingTFAWithdrawal: PropTypes.func.isRequired,
    startDisablingTFAWithdrawal: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    setActiveTfaToggleKey: PropTypes.func.isRequired,
    openOTPModal: PropTypes.func.isRequired,
    startChangingPassword: PropTypes.func.isRequired
  }

  renderTFALoginSwitch = () => {
    const {
      globalData: {
        currentUser: {
          twoFactorLoginEnabled,
          twoFactorWithdrawalEnabled,
          twoFactorToken
        }
      },
      setActiveTfaToggleKey,
      openOTPModal
    } = this.props;
    const didUserOptInTFAAlready = twoFactorLoginEnabled || twoFactorWithdrawalEnabled;
    const callback = () => {
      if (twoFactorLoginEnabled) {
        this.props.startDisablingTFALogin();
      } else {
        if (didUserOptInTFAAlready) {
          setActiveTfaToggleKey('twoFactorLoginEnabled');
          openOTPModal();
        } else {
          this.props.startEnablingTFALogin(twoFactorToken);
        }
      }
    };
    return (
      <div className="row pl-3 pr-3 pt-2 pb-2 bg-color-grey">
        <div className="label_inputs">
          2-factor authentication for login
          <label className="switch">
            <input
              type="checkbox"
              checked={twoFactorLoginEnabled}
              onClick={callback.bind(this)}
            />
            <span className="slider round" />
          </label>
        </div>
        <p className="myinfo_text">
          Utilize GoogleAuth to protect your account when logging in
        </p>
      </div>
    );
  }

  renderTFAWithdrawalSwitch = () => {
    const {
      globalData: {
        currentUser: {
          twoFactorLoginEnabled,
          twoFactorWithdrawalEnabled,
          twoFactorToken
        }
      },
      setActiveTfaToggleKey,
      openOTPModal
    } = this.props;
    const didUserOptInTFAAlready = twoFactorLoginEnabled || twoFactorWithdrawalEnabled;
    const callback = () => {
      if (twoFactorWithdrawalEnabled) {
        this.props.startDisablingTFAWithdrawal();
      } else {
        if (didUserOptInTFAAlready) {
          setActiveTfaToggleKey('twoFactorWithdrawalEnabled');
          openOTPModal();
        } else {
          this.props.startEnablingTFAWithdrawal(twoFactorToken);
        }
      }
    };
    return (
      <div className="row pl-3 pr-3 pt-2 pb-2 bg-color-grey">
        <div className="label_inputs">
          2-factor authentication for Withdrawal
          <label className="switch">
            <input
              type="checkbox"
              checked={twoFactorWithdrawalEnabled}
              onClick={callback}
            />
            <span className="slider round" />
          </label>
        </div>
        <p className="myinfo_text">
          Utilize GoogleAuth to protect your account when withdrawing funds
        </p>
      </div>
    );
  }

  render() {
    const {
      handleSubmit,
      pristine,
    } = this.props;
    return (
      <form className="row mt-3 h-100 bg_white" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <div className="row mt-5 pl-4">
            <div className="col-md-6">
              <Field
                name="firstName"
                type="text"
                component={RenderField}
                label="First Name"
                placeholder="First Name"
              />
            </div>
            <div className="col-md-6">
              <Field
                name="lastName"
                type="text"
                component={RenderField}
                label="Last Name"
                placeholder="Last Name"
              />
            </div>
            <div className="col-md-12 mt-3 input-group">
              <Field
                name="email"
                type="text"
                component={RenderField}
                label="Email Address"
                placeholder="Email Address"
              />
            </div>
            <div className="col-md-12 mt-3 input-group">
              <Field
                name="username"
                type="text"
                component={RenderField}
                label="Username"
                placeholder="Username"
              />
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="row">
            <div className="col-md-12  mr-auto">
              {this.renderTFALoginSwitch()}
            </div>
            <div className="col-md-12  mr-auto">
              {this.renderTFAWithdrawalSwitch()}
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6 mt-4">
          <span onClick={this.props.startChangingPassword} className="change_pwd_green_txt mt-2 cursor-pointer">
            Change Password
          </span>
        </div>
        <div className="col-md-3 col-6 mt-3">
          <button type="button" className="btn-create-register w-100">Update</button>
        </div>
      </form>
    );
  }
}

const mapStatetoProps = state => {
  const {
    globalData: {
      currentUser: {
        firstName,
        lastName,
        username,
        email
      }
    }
  } = state;
  return {
    initialValues: {
      firstName,
      lastName,
      username,
      email
    }
  };
};

const withConnect = connect(mapStatetoProps);
const withForm = reduxForm({
  form: 'user_my_information',
  validate
});

export default compose(
  withConnect,
  withForm
)(MyInformation);
