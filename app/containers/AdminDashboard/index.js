import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  isAdmin,
  isSuperAdmin,
  makeSelectLocation,
  makeSelectGlobal
} from 'containers/App/selectors';

import makeSelectAdminDashboard from './selectors';
import reducer from './reducers';
import saga from './saga';
import * as commonActions from './actions/common';
import * as tfaActions from './actions/twoFactorAuth';
import * as userActions from './actions/user';
import * as createAdminActions from './actions/createAdmin';

import AdminDashboard from './AdminDashboard';

const mapStateToProps = createStructuredSelector({
  adminDashboard: makeSelectAdminDashboard(),
  isAdmin: isAdmin(),
  isSuperAdmin: isSuperAdmin(),
  globalData: makeSelectGlobal(),
  location: makeSelectLocation()
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...commonActions,
  ...tfaActions,
  ...userActions,
  ...createAdminActions
}, dispatch);

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'adminDashboard', reducer });
const withSaga = injectSaga({ key: 'adminDashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminDashboard);
