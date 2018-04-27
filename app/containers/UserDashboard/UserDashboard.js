import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import SideBar from 'components/SideBar';
import navigationItems from './navigationItems';
import Modals from './components/Modals';

import Settings from './components/Settings';

export default class UserDashboard extends React.Component {
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
  match: PropTypes.object.isRequired
};

