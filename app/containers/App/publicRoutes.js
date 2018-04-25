import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LandingPage from 'containers/LandingPage';
import UserLoginPage from 'containers/UserLogin/Loadable';
import UserRegistrationPage from 'containers/UserRegister/Loadable';

const ROUTES = (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/user_login" component={UserLoginPage} />
    <Route path="/user_register" component={UserRegistrationPage} />
    <Route path="" component={LandingPage} />
  </Switch>
);

export default ROUTES;
