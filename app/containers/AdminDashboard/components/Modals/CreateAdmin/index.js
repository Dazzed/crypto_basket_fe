import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Modal } from 'reactstrap';

import RenderField from 'components/RenderField';
import Loading from 'components/Loading';
import validate from './validate';

class CreateAdmin extends React.Component {
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
                Create admin
              </p>
              <p className="popup_para_text">
                Please enter the following information to create a new admin. Upon
                creation an email will be generated to the provided email address so that
                the admin can create a username and password for their new account.
              </p>
              <div className="row mt-3">
                <div className="col-sm-6">
                  <Field
                    name="firstName"
                    type="text"
                    component={RenderField}
                    label="First Name"
                    placeholder=""
                  />
                </div>
                <div className="col-sm-6">
                  <Field
                    name="lastName"
                    type="text"
                    component={RenderField}
                    label="Last Name"
                    placeholder=""
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
                    name="otp"
                    type="text"
                    component={RenderField}
                    label="OTP"
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
                  Create Admin
              </button>}
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}

export default (reduxForm({
  form: 'create_admin',
  validate,
})(CreateAdmin));
