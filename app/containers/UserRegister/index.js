import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectUserRegister from './selectors';
import reducer from './reducer';
import saga from './saga';

import UserRegisterForm from './components/Form';
import StepTwo from './components/StepTwo';
import {
  performCreatingUser
} from './actions';
export class UserRegister extends React.Component {
  onRegister = values => {
    this.props.performCreatingUser(values);
  }

  renderComponent = () => {
    if (this.props.userRegister.user) {
      return (
        <StepTwo
          email={this.props.userRegister.user.email}
        />
      );
    } else {
      return (
        <UserRegisterForm
          onSubmit={this.onRegister}
        />
      );
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>UserRegister</title>
          <meta name="description" content="Description of UserRegister" />
        </Helmet>
        {this.renderComponent()}
      </div>
    );
  }
}

UserRegister.propTypes = {
  performCreatingUser: PropTypes.func.isRequired,
  userRegister: PropTypes.object.isRequired
};

const mapStateToProps = createStructuredSelector({
  userRegister: makeSelectUserRegister(),
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    performCreatingUser
  }, dispatch)
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'userRegister', reducer });
const withSaga = injectSaga({ key: 'userRegister', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserRegister);
