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
} from './actions';
import {
  makeSelectLocation,
  makeSelectGlobal
} from './selectors';

export class App extends React.Component {
  componentWillMount() {
    this.props.verifyAuth();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.globalData.isAuthenticated && this.props.globalData.isAuthenticated) {
      // perform stuff here when the user is authenticated
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
          <Navbar
            location={this.props.location}
            currentUser={this.props.globalData.currentUser}
            logOutRequest={this.props.logOutRequest}
            history={this.props.history}
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
  verifyAuth: PropTypes.func.isRequired,
  logOutRequest: PropTypes.func.isRequired,
  globalData: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    isAuthenticating: PropTypes.bool.isRequired,
    currentUser: PropTypes.object,
  }),
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = createStructuredSelector({
  globalData: makeSelectGlobal(),
  location: makeSelectLocation()
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    verifyAuth,
    logOutRequest,
  }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
