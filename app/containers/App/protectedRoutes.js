import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Admin imports
import AdminDashboard from 'containers/AdminDashboard/Loadable';

// User imports
import UserDashboard from 'containers/UserDashboard/Loadable';
import UserTFAFirstTimeSetup from 'containers/UserTFAFirstTimeSetup';

// Common imports


const ROUTES = (currentUser) => {
  const { roleMapping } = currentUser;
  if (roleMapping) {
    const {
      role: {
        name: roleName
      }
    } = roleMapping;
    switch (roleName) {
      case 'super_admin':
        return (
          <Switch>
            <Route path="/dashboard" component={AdminDashboard} />
            <Redirect from="/" to="/dashboard/users" />
          </Switch>
        );
      case 'admin':
        return (
          <Switch>
            <Route path="/dashboard" component={AdminDashboard} />
            <Redirect from="/" to="/dashboard" />
          </Switch>
        );
      default:
        return null;
    }
  }
  return (
    <Switch>
      <Route path="/dashboard" component={UserDashboard} />
      <Route exact path="/tfa_setup" component={UserTFAFirstTimeSetup} />
      <Redirect from="/" to="/dashboard" />
    </Switch>
  );
};

export default ROUTES;
