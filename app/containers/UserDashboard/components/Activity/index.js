import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';

import Deposits from './components/Deposits';
import Refunds from './components/Refunds';
import Purchases from './components/Purchases';
import Sales from './components/Sales';
import Withdrawals from './components/Withdrawals';

export default class componentName extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  render() {
    const { match } = this.props;
    return (
      <div className="col-12 col-lg-9 col-md-12 h-100 content_section">
        <h2 className="p-4">Activity</h2>
        <div className="text-left tab_settings mt-3 pb-0 pt-0 pl-4 tab_activity">
          <span className={`pb-3 ${location.pathname.includes('purchases') ? 'active_tab_title' : 'tab_title tab_list'}`}>
            <NavLink exact to={`${match.url}/purchases`}>Purchases</NavLink>
          </span>
          <span className={`pb-3 ml-5 ${location.pathname.includes('sales') ? 'active_tab_title' : 'tab_title tab_list'}`}>
            <NavLink exact to={`${match.url}/sales`}>Sales</NavLink>
          </span>
          <span className={`pb-3 ml-5 ${location.pathname.includes('deposits') ? 'active_tab_title' : 'tab_title tab_list'}`}>
            <NavLink exact to={`${match.url}/deposits`}>Deposits</NavLink>
          </span>
          <span className={`pb-3 ml-5 ${location.pathname.includes('withdrawals') ? 'active_tab_title' : 'tab_title tab_list'}`}>
            <NavLink exact to={`${match.url}/withdrawals`}>Withdrawls</NavLink>
          </span>
          <span className={`pb-3 ml-5 ${location.pathname.includes('refunds') ? 'active_tab_title' : 'tab_title tab_list'}`}>
            <NavLink exact to={`${match.url}/refunds`}>Refunds</NavLink>
          </span>
        </div>
        <Switch>
          <Route
            exact
            path={`${match.url}/deposits`}
            render={props =>
              <Deposits {...this.props} {...props} />
            }
          />
          <Route
            exact
            path={`${match.url}/withdrawals`}
            render={props =>
              <Withdrawals {...this.props} {...props} />
            }
          />
          <Route
            exact
            path={`${match.url}/refunds`}
            render={props =>
              <Refunds {...this.props} {...props} />
            }
          />
          <Route
            exact
            path={`${match.url}/purchases`}
            render={props =>
              <Purchases {...this.props} {...props} />
            }
          />
          <Route
            exact
            path={`${match.url}/sales`}
            render={props =>
              <Sales {...this.props} {...props} />
            }
          />
          <Redirect from={`${match.url}`} to={`${match.url}/deposits`} />
        </Switch>
      </div>
    );
  }
}
