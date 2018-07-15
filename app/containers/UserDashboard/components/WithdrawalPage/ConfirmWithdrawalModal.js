import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';

import Loading from 'components/Loading';

export default class ConfirmWithdrawalModal extends Component {
  static propTypes = {
    withdrawalInfo: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    submitWithdrawal: PropTypes.func.isRequired
  };
  constructor(){
    super();
    this.state = { otp: "" };
  }

  onChange = evt => {
    this.setState({otp: evt.target.value});
  }

  submit = () => {
    this.props.submitWithdrawal({
      ...this.state,
      ...this.props.withdrawalInfo
    });
  }

  render() {
    const {
      onCancel,
      withdrawalInfo
    } = this.props;
    return (
      <Modal isOpen>
        <button onClick={onCancel} type="button" className="close_google_auth close text-right ml-auto mr-3" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
        <div className="row">
          <div className="col-lg-12 pb-4 pl-5">
            <p className="create_GA_popup_text">
              Please confirm withdrawal
            </p>
            <div className="col-12">
              <p style={{ textAlign: 'middle', color: 'black' }}>
                Please make sure the address you enter is valid.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 pl-5 pr-5">
            <div style={{ borderTop: '1px solid #beccc2' }}>
              <span className="float-left mt-2">
                <p>Withdraw</p>
              </span>
              <span className="float-right">
                {withdrawalInfo.amount} {withdrawalInfo.coin.toUpperCase()}
              </span>
            </div>
          </div>
          <div className="col-12 pl-5 pr-5">
            <div style={{ borderTop: '1px solid #beccc2' }}>
              <span className="float-left mt-2">
                <p>Address</p>
              </span>
              <span className="float-right">
                {withdrawalInfo.address}
              </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 pl-5 pr-5">
            <span className="float-left mt-2">
                <p>GoogleAuth Code</p>
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-12 pl-5 pr-5">
            <span>
              <input
                type="text"
                className="full-width-input"
                value={this.state.otp}
                onChange={this.onChange}
              />
            </span>
          </div>
        </div>

        <div className="row pt-5 pb-4">
          <div className="col-md-6 col-offset-3">
            <button
              onClick={this.submit}
              className="btn-confirm-purchase"
              style={{width: '75% !important'}}
            >
              Confirm Withdrawal
          </button>
          </div>
        </div>
      </Modal>
    );
  }
}
