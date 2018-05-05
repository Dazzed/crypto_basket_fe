import React from 'react';
import PropTypes from 'prop-types';
// import { resetUserPassword } from '../../../AdminDashboard/actions/user';
import ResetForm from '../Form';
export default class UsernameForm extends React.Component {
  submit = data => {
    this.props.resetUserPassword(data);
    this.props.history.push(`/user_login`);
  }

  render() {
    return (
      <div>
        <ResetForm
          onSubmit={this.submit}
          isReset={true}
          userName={true}
        />
      </div>
    );
  }
}