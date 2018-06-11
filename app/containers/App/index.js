import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import Loading from 'components/Loading';
import PROTECTED_ROUTES from './protectedRoutes';
import PUBLIC_ROUTES from './publicRoutes';
import {
  verifyAuth,
  logOutRequest,
  submitFeedback,
  closeFeedbackModal,
  openFeedbackModal
} from './actions';
import {
  makeSelectLocation,
  makeSelectGlobal
} from './selectors';

import FeedbackModal from './components/FeedbackModal';

export class App extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.globalData.isAuthenticated && this.props.globalData.isAuthenticated) {
      // perform stuff here when the user is authenticated
      // const {
      //   currentUser
      // } = this.props.globalData;
      // if (currentUser.isLoggingInFirstTime) {
      //   this.props.history.push('/tfa_setup');
      // }
    }
  }

  renderModals = () => {
    const {
      globalData
    } = this.props;
    if (globalData.feedbackModalOpen) {
      return (
        <FeedbackModal
          loading={globalData.isSubmittingFeedback}
          onSubmit={this.props.submitFeedback}
          onCancel={this.props.closeFeedbackModal}
        />
      );
    }
  }

  render() {
    const {
      globalData: {
        isAuthenticating,
        isAuthenticated,
        currentUser
      }
    } = this.props;
    if (isAuthenticating) {
      return <Loading insideContainer />;
    } else if (isAuthenticated) {
      return (
        <div>
          {this.renderModals()}
          <Navbar
            location={this.props.location}
            currentUser={this.props.globalData.currentUser}
            logOutRequest={this.props.logOutRequest}
            history={this.props.history}
            openFeedbackModal={this.props.openFeedbackModal}
          />
          {PROTECTED_ROUTES(currentUser)}
          {/* <Footer /> */}
        </div>
      );
    }
    return (
      <div>
        <Navbar
          location={this.props.location}
          history={this.props.history}
        />
        {PUBLIC_ROUTES}
      </div>
    );
  }
}

App.propTypes = {
  logOutRequest: PropTypes.func.isRequired,
  globalData: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    isAuthenticating: PropTypes.bool.isRequired,
    currentUser: PropTypes.object,
  }),
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  submitFeedback: PropTypes.func.isRequired,
  closeFeedbackModal: PropTypes.func.isRequired,
  openFeedbackModal: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  globalData: makeSelectGlobal(),
  location: makeSelectLocation()
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    verifyAuth,
    logOutRequest,
    submitFeedback,
    closeFeedbackModal,
    openFeedbackModal
  }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
