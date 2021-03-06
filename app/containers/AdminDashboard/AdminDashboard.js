import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import ToasterHOC from 'components/ToasterHOC';
import SideBar from 'components/SideBar';
import navigationItems from './navigationItems';

import Users from './components/Users';
import User from './components/User';
import Assets from './components/Assets';
import Asset from './components/Asset';
import Modals from './components/Modals';
import Activity from './components/Activity';

class AdminDashboard extends React.Component {
  componentDidMount() {
    if (this.props.adminDashboard.assets.length === 0) {
      this.props.fetchAssets();
    }
  }

  render() {
    const { match } = this.props;
    return (
      <div className="container-fluid">
        <Helmet>
          <title>Admin Dashboard</title>
        </Helmet>
        <Modals {...this.props} />
        <div className="row h-100 sidebar_melotic">
          <SideBar navigationItems={navigationItems} />
          <Switch>
            <Route path={`${match.url}/users`} render={props => <Users {...this.props} {...props} />} />
            <Route path={`${match.url}/user/:id`} render={props => <User {...this.props} {...props} />} />
            <Route path={`${match.url}/assets`} render={props => <Assets {...this.props} {...props} />} />
            <Route path={`${match.url}/asset/:id`} render={props => <Asset {...this.props} {...props} />} />
            <Route
              path={`${match.url}/activity`}
              render={
                props => <Activity {...this.props} {...props} />
              }
            />
          </Switch>
        </div>
      </div>
    );
  }
}

AdminDashboard.propTypes = {
  adminDashboard: PropTypes.object.isRequired,
  fetchAssets: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export default ToasterHOC(AdminDashboard);
