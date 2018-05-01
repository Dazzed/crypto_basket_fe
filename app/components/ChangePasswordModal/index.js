import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Modal } from 'reactstrap';

import RenderField from 'components/RenderField';
import Loading from 'components/Loading';
import validate from './validate';

class ChangePasswordModal extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  render() {
    const {
      loading,
      handleSubmit,
      onCancel
    } = this.props;
    return (
      <Modal isOpen>
        <button onClick={onCancel} type="button" className="close_google_auth close text-right ml-auto mr-3" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
        <div className="row justify-content-center">
          <div className="col-lg-12 p-5">
            <form onSubmit={handleSubmit}>
              <p className="create_GA_popup_text">
                Change your password?
              </p>
              <p className="popup_para_text">
                Please enter your current password followed by your new password.
                Password must be at least 8 digits and contain at least one uppercase
                letter, lowercase letter, numeric value and symbol.
              </p>
              <div className="row mt-3">
                <div className="col-sm-12">
                  <Field
                    name="oldPassword"
                    type="password"
                    component={RenderField}
                    label="Current Password"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-12">
                  <Field
                    name="newPassword"
                    type="password"
                    component={RenderField}
                    label="New Password"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-12">
                  <Field
                    name="confirmNewPassword"
                    type="password"
                    component={RenderField}
                    label="Repeat New Password"
                    placeholder=""
                  />
                </div>
              </div>
              <br />
              <br />
              {loading ?
                <Loading insideModal /> :
                <button
                  type="submit"
                  className="btn-create-register"
                >
                  Update Password
              </button>}
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}

export default (reduxForm({
  form: 'change_password',
  validate,
})(ChangePasswordModal));
