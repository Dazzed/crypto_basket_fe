import React, { Component, Fragment } from 'react';
import { Modal } from 'reactstrap';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import Loading from 'components/Loading';
import RenderTextArea from 'components/RenderField/TextArea';

class FeedbackModal extends Component {
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
                Send Feedback
              </p>
              <p className="popup_para_text">
                If you have questions or suggestions when you use Melotic, feel free to
                send feedback to us. We are glad to hear from you and make Melotic
                better together.
              </p>
              <div className="row mt-3">
                <div className="col-sm-12">
                  <Field
                    name="feedback"
                    type="text"
                    component={RenderTextArea}
                    label="Feedback"
                    placeholder=""
                    rows={5}
                  />
                </div>
              </div>
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
  if (!values.feedback) {
    errors.feedback = 'Feedback cannot be empty';
  } else if (values.otp && !String(values.feedback).trim()) {
    errors.feedback = 'Feedback cannot be empty';
  }
  return errors;
};

export default (reduxForm({
  form: 'feedback_form',
  validate
})(FeedbackModal));
