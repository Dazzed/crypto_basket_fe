import React, { Component, Fragment } from 'react';
import { Modal } from 'reactstrap';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import Loading from 'components/Loading';
import RenderField from 'components/RenderField';

class OtpModal extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };

  renderModalContent = () => {
    const {
      loading,
      handleSubmit,
      onCancel
    } = this.props;
    return (
      <Fragment>
        <button onClick={onCancel} type="button" className="close_google_auth close text-right ml-auto mr-3" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
        <div className="row justify-content-center">
          <div className="col-lg-12 p-5">
            <form onSubmit={handleSubmit}>
              <p className="create_GA_popup_text">
                Enter OTP (One time password)
              </p>
              <br />
              <br />
              <br />
              <Field
                name="otp"
                type="text"
                component={RenderField}
                label="OTP"
                placeholder=""
              />
              <br />
              <br />
              {loading ?
                <Loading insideModal /> :
                <button
                  type="submit"
                  className="btn-create-register btn-block"
                >
                  Submit
              </button>}
            </form>
          </div>
        </div>
      </Fragment>
    );
  }

  render() {
    return (
      <Modal isOpen>
        {this.renderModalContent()}
      </Modal>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.otp) {
    errors.otp = 'OTP cannot be empty';
  } else if (values.otp && !String(values.otp).trim()) {
    errors.otp = 'OTP cannot be empty';
  } else if (values.otp && isNaN(Number(values.otp))) {
    errors.otp = 'OTP must be a number';
  } else if (values.otp && String(values.otp).length !== 6) {
    errors.otp = 'OTP should be Six digits in length';
  }
  return errors;
};

export default (reduxForm({
  form: 'otp_form',
  validate
})(OtpModal));
