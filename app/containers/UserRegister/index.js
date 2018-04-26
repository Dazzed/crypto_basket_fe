import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import queryString from 'query-string';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Loading from 'components/Loading';

import makeSelectUserRegister from './selectors';
import reducer from './reducer';
import saga from './saga';

import UserRegisterForm from './components/Form';
import StepTwo from './components/StepTwo';
import StepThree from './components/StepThree';

import {
  performCreatingUser,
  performEmailVerification,
  toggleEmailVerifiedFlag
} from './actions';

export class UserRegister extends React.Component {
  componentWillMount() {
    const queryParams = queryString.parse(this.props.location.search);
    if (queryParams.confirm_token) {
      const { confirm_token } = queryParams;
      this.props.performEmailVerification(confirm_token);
    }
  }

  onRegister = values => {
    this.props.performCreatingUser(values);
  }

  renderComponent = () => {
    if (this.props.userRegister.isVerifyingEmail) {
      return <Loading insideContainer />;
    }
    if (this.props.userRegister.user) {
      return (
        <StepTwo
          email={this.props.userRegister.user.email}
        />
      );
    } else if (this.props.userRegister.emailVerfiedSuccessfully) {
      return (
        <StepThree
          toggleEmailVerifiedFlag={this.props.toggleEmailVerifiedFlag}
        />
      );
    } else {
      return (
        <UserRegisterForm
          onSubmit={this.onRegister}
          {...this.props.userRegister}
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
  userRegister: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  performEmailVerification: PropTypes.func.isRequired,
  toggleEmailVerifiedFlag: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  userRegister: makeSelectUserRegister(),
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    performCreatingUser,
    performEmailVerification,
    toggleEmailVerifiedFlag
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
