import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import ToasterHOC from 'components/ToasterHOC';
import SideBar from 'components/SideBar';

import ResetPassword from './components/ResetPassword';
import NewPassword from './components/NewPassword';

class PasswordReset extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <div className="container-fluid">
        <Switch>
          <Route path={`/reset`} render={props => <ResetPassword {...this.props} {...props} />} />
          <Route path={`/reset_password`} render={props => <NewPassword {...this.props} {...props} />} />
        </Switch>
      </div>
    );
  }
}

PasswordReset.propTypes = {
  globalData: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default ToasterHOC(PasswordReset);
