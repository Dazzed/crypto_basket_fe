import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LandingPage from 'containers/LandingPage';
import UserLoginPage from 'containers/UserLogin/Loadable';
import PasswordReset from 'containers/PasswordReset/Loadable';
import UserRegistrationPage from 'containers/UserRegister/Loadable';
import AdminSetupPage from 'containers/AdminSetup/Loadable';

const ROUTES = (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/user_login" component={UserLoginPage} />
    <Route path="/reset" component={PasswordReset} />
    <Route path="/reset_password" component={PasswordReset} />
    <Route path="/forgot_username" component={PasswordReset} />
    <Route path="/user_register" component={UserRegistrationPage} />
    <Route path="/admin_setup" component={AdminSetupPage} />
    <Route path="" component={LandingPage} />
  </Switch>
);

export default ROUTES;
