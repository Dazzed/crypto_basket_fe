import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import queryString from 'query-string';

import Loading from 'components/Loading';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  makeSelectGlobal
} from 'containers/App/selectors';

import TwoFactorEnableModal from 'components/TwoFactorEnableModal';

import makeSelectAdminSetup from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';

import OnboardingForm from './components/OnboardingForm';

export class AdminSetup extends React.Component {
  componentWillMount() {
    const {
      globalData
    } = this.props;
    if (globalData.isAuthenticated) {
      this.props.history.replace('/');
    }
  }

  componentDidMount() {
    const queryParams = queryString.parse(this.props.location.search);
    if (queryParams.token) {
      const { token } = queryParams;
      this.props.initiateOnboarding(token);
    } else {
      this.props.history.replace('/');
    }
  }

  onSubmit = ({username, password, otp}) => {
    const {
      adminSetup: {
        hasSeenTfaModal,
        verificationToken
      },
    } = this.props;
    if (hasSeenTfaModal) {
      this.props.completeOnboarding(
        verificationToken,
        username,
        password,
        otp
      );
    } else {
      this.props.submitFormOne();
      this.props.openTfaModal();
    }
  }

  renderTFAModal = () => {
    const {
      adminSetup: {
        isTfaModalOpen,
        qrCode,
        manualCode,
        currentUser
      }
    } = this.props;
    if (isTfaModalOpen) {
      const callback = () => {
        this.props.closeTfaModal();
        this.props.toggleSeenTfaModal();
      };
      return (
        <TwoFactorEnableModal
          currentUser={currentUser}
          loading={false}
          hideClose
          qrCode={qrCode}
          manualCode={manualCode}
          openOTPModal={callback.bind(this)}
        />
      );
    }
    return null;
  }

  render() {
    if (this.props.adminSetup.isInitiatingOnboarding) {
      return <Loading insideContainer />;
    }
    return (
      <div>
        <Helmet>
          <title>AdminSetup</title>
          <meta name="description" content="Description of AdminSetup" />
        </Helmet>
        {this.renderTFAModal()}
        <OnboardingForm {...this.props} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

AdminSetup.propTypes = {
  adminSetup: PropTypes.object.isRequired,
  globalData: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  initiateOnboarding: PropTypes.func.isRequired,
  toggleSeenTfaModal: PropTypes.func.isRequired,
  openTfaModal: PropTypes.func.isRequired,
  closeTfaModal: PropTypes.func.isRequired,
  completeOnboarding: PropTypes.func.isRequired,
  submitFormOne: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  adminSetup: makeSelectAdminSetup(),
  globalData: makeSelectGlobal(),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'adminSetup', reducer });
const withSaga = injectSaga({ key: 'adminSetup', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminSetup);
