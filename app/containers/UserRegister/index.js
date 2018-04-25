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

export class UserRegister extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>UserRegister</title>
          <meta name="description" content="Description of UserRegister" />
        </Helmet>
        <h1>Register</h1>
      </div>
    );
  }
}

UserRegister.propTypes = {

};

const mapStateToProps = createStructuredSelector({
  userRegister: makeSelectUserRegister(),
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({

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
