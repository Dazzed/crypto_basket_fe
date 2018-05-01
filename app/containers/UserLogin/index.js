import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import ToasterHOC from 'components/ToasterHOC';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectUserLogin from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  loginRequest
} from './actions';

import LoginForm from './components/Form';

export class UserLogin extends React.Component {
  submit = values => {
    this.props.loginRequest(values, this.props.showToastSuccess, this.props.showToastError, this.props.userLogin.tfaRequired, this.props.userLogin.tfaToken);
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>UserLogin</title>
          <meta name="description" content="Description of UserLogin" />
        </Helmet>
        <LoginForm
          onSubmit={this.submit}
          isLoggingIn={this.props.userLogin.isLoggingIn}
          loginFailed={this.props.userLogin.loginFailed}
          tfaRequired={this.props.userLogin.tfaRequired}
        />
      </div>
    );
  }
}

UserLogin.propTypes = {
  userLogin: PropTypes.object.isRequired,
  showToastSuccess: PropTypes.func.isRequired,
  showToastError: PropTypes.func.isRequired,
  loginRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userLogin: makeSelectUserLogin(),
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    loginRequest
  }, dispatch)
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'userLogin', reducer });
const withSaga = injectSaga({ key: 'userLogin', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  ToasterHOC
)(UserLogin);
