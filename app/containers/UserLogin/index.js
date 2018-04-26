import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectUserLogin from './selectors';
import reducer from './reducer';
import saga from './saga';

import LoginForm from './components/Form';

export class UserLogin extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>UserLogin</title>
          <meta name="description" content="Description of UserLogin" />
        </Helmet>
        <LoginForm />
      </div>
    );
  }
}

UserLogin.propTypes = {

};

const mapStateToProps = createStructuredSelector({
  userLogin: makeSelectUserLogin(),
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({

  }, dispatch)
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'userLogin', reducer });
const withSaga = injectSaga({ key: 'userLogin', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserLogin);
