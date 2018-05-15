import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import ToasterHOC from 'components/ToasterHOC';
import SideBar from 'components/SideBar';
import navigationItems from './navigationItems';
import Modals from './components/Modals';

import Settings from './components/Settings';
import BuyPage from './components/BuyPage';

class UserDashboard extends React.Component {
  componentWillMount() {
    const {
      currentUser
    } = this.props.globalData;
    // only for regular user, not for admins/super admins
    if (currentUser.isLoggingInFirstTime) {
      this.props.history.push('/tfa_setup');
    }
    this.props.fetchAllAssets();
  }

  render() {
    const { match } = this.props;
    return (
      <div className="container-fluid">
        <Modals {...this.props} />
        <Helmet>
          <title>UserDashboard</title>
          <meta name="description" content="Description of UserDashboard" />
        </Helmet>
        <div className="row h-100 sidebar_melotic">
          <SideBar navigationItems={navigationItems} />
          <Switch>
            <Route path={`${match.url}/settings`} render={props => <Settings {...this.props} {...props} />} />
            <Route path={`${match.url}/buy`} render={props => <BuyPage {...this.props} {...props} />} />
          </Switch>
        </div>
      </div>
    );
  }
}

UserDashboard.propTypes = {
  userDashboard: PropTypes.object.isRequired,
  globalData: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  fetchAllAssets: PropTypes.func.isRequired,
};

export default ToasterHOC(UserDashboard);

