import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import ToasterHOC from 'components/ToasterHOC';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  isAdmin,
  isSuperAdmin,
  makeSelectLocation,
  makeSelectGlobal
} from 'containers/App/selectors';

import saga from './saga';

import * as actions from './actions';

import PasswordReset from './PasswordReset';

const mapStateToProps = createStructuredSelector({
  globalData: makeSelectGlobal(),
  location: makeSelectLocation()
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions,
}, dispatch);

const withConnect = connect(mapStateToProps, mapDispatchToProps);

// const withReducer = injectReducer({ key: 'adminDashboard', userReducer });

const withSaga = injectSaga({ key: 'passwordResert', saga });

export default compose(
  // withReducer,
  withSaga,
  withConnect,
  ToasterHOC
)(PasswordReset);
