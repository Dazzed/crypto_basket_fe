import React from 'react';
import PropTypes from 'prop-types';
// import { resetUserPassword } from '../../../AdminDashboard/actions/user';
import ResetForm from '../Form';
export default class ResetPassword extends React.Component {
  submit = data => {
    this.props.resetUserPassword(data);
  }

  render() {
    return (
      <div>
        <ResetForm
          onSubmit={this.submit}
          isReset={false}
        />
      </div>
    );
  }
}