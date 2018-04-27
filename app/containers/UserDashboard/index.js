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
import * as commonActions from './actions/common';

const mapStateToProps = createStructuredSelector({
  userDashboard: makeSelectUserDashboard(),
  globalData: makeSelectGlobal(),
  location: makeSelectLocation()
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...commonActions,
  ...twoFactorActions
}, dispatch);

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'userDashboard', reducer });
const withSaga = injectSaga({ key: 'userDashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserDashboard);
