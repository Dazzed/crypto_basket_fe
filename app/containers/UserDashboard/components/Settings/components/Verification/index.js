/* eslint-disable no-alert */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import FrameImg1 from 'img/frame_img1.png';

import RenderField from 'components/RenderField';
import RenderDatePicker from 'components/RenderDatePicker';
import Loading from 'components/Loading';
import validate from './validate';

const SUPPORTED_FILE_TYPES = ['image/jpeg', 'image/png']

class Verification extends Component {
  static propTypes = {
    initialValues: PropTypes.object.isRequired,
    formValues: PropTypes.object,
    change: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    touch: PropTypes.func.isRequired,
    userDashboard: PropTypes.object.isRequired,
    pristine: PropTypes.bool.isRequired,
    globalData: PropTypes.object.isRequired,
    existingIdentityDocument: PropTypes.object,
    existingProofDocument: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.uploadIdentityButton = React.createRef();
    this.uploadProofButton = React.createRef();
  }

  onSelectDate = value => {
    this.props.change('dob', value);
  }

  onChangeRaw = evt => {
    this.props.touch('dob');
    this.props.change('dob', evt.target.value);
  }

  renderSelectedDate = () => {
    if (this.props.formValues) {
      if (moment(this.props.formValues.dob).isValid()) {
        return moment(this.props.formValues.dob);
      }
      return null;
    }
    return null;
  }

  renderStatus = () => {
    const {
      globalData: {
        currentUser: {
          verificationStatus
        }
      }
    } = this.props;
    if (verificationStatus === 'fully_verified') {
      return (
        <div className="col-md-12 w-100 success_verification  text-center">
          <span className="success_verified_text">Your account is verified</span>
        </div>

      );
    } else if (verificationStatus === 'verification_pending') {
      return (
        <div className="col-md-12 w-100 error_verification text-center">
          Your account is pending verification. You have submitted your information.
        </div>
      );
    } else {
      return (
        <div className="col-md-12 w-100 error_verification text-center">
          Your account is unverified
        </div>
      );
    }
  }

  renderIdentityDocumentName = () => {
    const {
      existingIdentityDocument
    } = this.props;
    if (this.props.formValues && this.props.formValues.identityDocument) {
      return <p className="user-verify-image-filename melotic-green">{this.props.formValues.identityDocument.name}</p>;
    } else if (existingIdentityDocument) {
      return null;
    } else {
      return <p className="user-verify-image-filename">Upload a copy of your ID</p>;
    }
  }

  renderProofDocumentName = () => {
    const {
      existingProofDocument
    } = this.props;
    if (this.props.formValues && this.props.formValues.proofDocument) {
      return <p className="user-verify-image-filename melotic-green">{this.props.formValues.proofDocument.name}</p>;
    } else if (existingProofDocument) {
      return null;
    } else {
      return <p className="user-verify-image-filename">Upload a photo of your self</p>;
    }
  }

  onChangeIdentityUpload = evt => {
    const targetFile = evt.target.files[0];
    if (targetFile) {
      if (SUPPORTED_FILE_TYPES.includes(targetFile.type)) {
        this.props.change('identityDocument', evt.target.files[0]);
      } else {
        alert('Only JPEG and PGN files are supported');
      }
    }
  }

  onChangeProofUpload = evt => {
    const targetFile = evt.target.files[0];
    if (targetFile) {
      if (SUPPORTED_FILE_TYPES.includes(targetFile.type)) {
        this.props.change('proofDocument', evt.target.files[0]);
      } else {
        alert('Only JPEG and PGN files are supported');
      }
    }
  }

  handleIdentityClick = () => {
    const {
      globalData: {
        currentUser: {
          verificationStatus
        }
      }
    } = this.props;
    if (verificationStatus === 'fully_verified') {
      alert('You have already uploaded an identity document');
    } else {
      this.uploadIdentityButton.click();
    }
  }

  handleProofClick = () => {
    const {
      globalData: {
        currentUser: {
          verificationStatus
        }
      }
    } = this.props;
    if (verificationStatus === 'fully_verified') {
      alert('You have already uploaded a proof document');
    } else {
      this.uploadProofButton.click();
    }
  }

  renderVerficationStatus = () => {
    const {
      globalData: {
        currentUser: {
          verificationStatus
        }
      }
    } = this.props;
    if (verificationStatus === 'unverified') {
      return (
        <div className="col-md-12 w-100 error_verification text-center">
          Your account is unverified.
        </div>
      );
    } else if (verificationStatus === 'verification_pending') {
      return (
        <div className="col-md-12 w-100 error_verification text-center">
          Your account is pending verification. You have submitted your information.
        </div>
      );
    } else {
      return (
        <div className="col-md-12 w-100 success_verification text-center">
          <strong className="melotic-green">Your account is verified!.</strong>
        </div>
      );
    }
  }

  renderIdentityDocumentImage = () => {
    const {
      formValues,
      existingIdentityDocument
    } = this.props;
    if (formValues && formValues.identityDocument) {
      return FrameImg1;
    } else if (existingIdentityDocument) {
      return existingIdentityDocument.url;
    } else {
      return FrameImg1;
    }
  }

  renderProofDocumentImage = () => {
    const {
      formValues,
      existingProofDocument
    } = this.props;
    if (formValues && formValues.proofDocument) {
      return FrameImg1;
    } else if (existingProofDocument) {
      return existingProofDocument.url;
    } else {
      return FrameImg1;
    }
  }

  render() {
    const {
      handleSubmit,
      pristine,
      userDashboard: {
        isPatchingUser,
        isUploadingIdentity,
        isUploadingProof
      },
    } = this.props;
    return (
      <div className="row mt-3 h-100 bg-white">
        <input type="file" ref={thizRef => { this.uploadIdentityButton = thizRef; }} onChange={this.onChangeIdentityUpload} style={{ display: 'none' }} />
        <input type="file" ref={thizRef => { this.uploadProofButton = thizRef; }} onChange={this.onChangeProofUpload} style={{ display: 'none' }} />

        {this.renderVerficationStatus()}
        <div className="col-md-8 m-auto">
          <div className="row mt-5 pl-4">
            <div className="col-md-6" onClick={this.handleIdentityClick}>
              {this.renderIdentityDocumentName()}
              <img
                // src={existingIdentityDocument ? existingIdentityDocument.url : FrameImg1}
                src={this.renderIdentityDocumentImage()}
                className="img-fluid frame_1 w-100 cursor-pointer"
              />
            </div>
            <div className="col-md-6" onClick={this.handleProofClick}>
              {this.renderProofDocumentName()}
              <img
                // src={existingProofDocument ? existingProofDocument.url : FrameImg1}
                src={this.renderProofDocumentImage()}
                className="img-fluid frame_1 set_verify w-100 cursor-pointer"
              />
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row mt-5 pl-4">
              <div className="col-md-6">
                <Field
                  name="country"
                  type="text"
                  component={RenderField}
                  label="Country"
                  placeholder="Country"
                />
              </div>
              <div className="col-md-6">
                <Field
                  name="state"
                  type="text"
                  component={RenderField}
                  label="State"
                  placeholder="State"
                />
              </div>
            </div>
            <div className="row mt-3 pl-4">
              <div className="hidden">
                <Field
                  name="dob"
                  type="text"
                  component={RenderField}
                  label="dob"
                  placeholder="dob"
                  className="hidden"
                />
              </div>
              <div className="col-md-12 mt-3 input-group">
                <div className="w-100">
                  <Field
                    name="dob"
                    component={RenderDatePicker}
                    label="Date of Birth"
                    selected={this.renderSelectedDate()}
                    onSelect={this.onSelectDate}
                    onChangeRaw={this.onChangeRaw}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12 mt-4 pb-4 float-right">
              {
                (isPatchingUser || isUploadingIdentity || isUploadingProof) ?
                  <Loading insideModal /> :
                  <button
                    type="submit"
                    className={`btn-create-register w-100 ${pristine && 'btn-disabled'}`}
                    disabled={pristine}
                  >
                    Submit Information
                  </button>
              }
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(thizState) {
  const {
    globalData: {
      currentUser: {
        country,
        state,
        dob,
        documents = []
      }
    }
  } = thizState;
  return {
    initialValues: {
      country,
      state,
      dob: moment(dob).isValid() ? moment(dob) : null,
    },
    formValues: getFormValues('user_verification')(thizState),
    existingIdentityDocument: (documents || []).find(({ type }) => type === 'identity'),
    existingProofDocument: (documents || []).find(({ type }) => type === 'proof')
  };
}

export default connect(mapStateToProps)(reduxForm({
  form: 'user_verification',
  validate,
  enableReinitialize: true
})(Verification));
