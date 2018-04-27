import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default class SideBar extends Component {
  static propTypes = {
    navigationItems: PropTypes.array.isRequired,
  };

  static defaultProps = {
    navigationItems: []
  };

  activeClass = (path) => {
    if (path === '/dashboard') {
      if (location.pathname === '/dashboard') {
        return 'active';
      }
    } else if (location.pathname.includes(path)) {
      return 'active';
    }
    return '';
  }

  renderNavItems = () => {
    const { navigationItems } = this.props;
    return navigationItems.map((navItem, index) => (
      <li className={`nav-item float-right text-center ${this.activeClass(navItem.path)}`} key={`desktop_nav_item_${index}`}>
        <NavLink exact className={`nav-link pl-0 ${this.activeClass(navItem.path)}`} to={navItem.path}>
          <i className="fa fa-dashboard nav_icon" />
          <span className="nav_text">{navItem.name}</span>
        </NavLink>
      </li>
    ));
  }

  render() {
    return (
      <div className="col-12 col-lg-3 col-md-4 side_bar_style d-lg-block d-md-none d-none">
        <nav className="navbar navbar-expand  flex-row align-items-start mt-5">
          <div className="collapse navbar-collapse navbar-light">
            <ul className="flex-column flex-row navbar-nav w-100 justify-content-between">
              {this.renderNavItems()}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
