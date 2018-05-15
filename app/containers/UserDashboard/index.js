import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  makeSelectLocation,
  makeSelectGlobal
} from 'containers/App/selectors';

import makeSelectUserDashboard from './selectors';
import reducer from './reducers';
import saga from './saga';

import UserDashboard from './UserDashboard';

import * as twoFactorActions from './actions/twoFactorAuthActions';
import * as changePasswordActions from './actions/changePassword';
import * as commonActions from './actions/common';
import * as buyActions from './actions/buyActions';

const mapStateToProps = createStructuredSelector({
  userDashboard: makeSelectUserDashboard(),
  globalData: makeSelectGlobal(),
  location: makeSelectLocation()
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...commonActions,
  ...twoFactorActions,
  ...changePasswordActions,
  ...buyActions
}, dispatch);

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'userDashboard', reducer });
const withSaga = injectSaga({ key: 'userDashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserDashboard);
