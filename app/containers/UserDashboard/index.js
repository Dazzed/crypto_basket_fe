/**
 *
 * UserDashboard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectUserDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';

export class UserDashboard extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>UserDashboard</title>
          <meta name="description" content="Description of UserDashboard" />
        </Helmet>
      </div>
    );
  }
}

UserDashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userdashboard: makeSelectUserDashboard(),
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({

  }, dispatch)
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'userDashboard', reducer });
const withSaga = injectSaga({ key: 'userDashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserDashboard);
