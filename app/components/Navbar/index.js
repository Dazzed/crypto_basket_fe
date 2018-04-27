import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import AvatarPng from 'img/avatar.png';

class AppNavbar extends React.Component {
  state = {
    dropdownOpen: false,
    dropdownMobileOpen: false
  };

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  toggleMobile = () => {
    this.setState(prevState => ({
      dropdownMobileOpen: !prevState.dropdownMobileOpen
    }));
  }

  navigateTo = path => {
    this.props.history.push(path);
  }

  render() {
    const {
      currentUser
    } = this.props;
    if (!currentUser) {
      return (
        <div className="header">
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">MELOTIC</Link>
            <button className="navbar-toggler" type="button">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="nav navbar-nav ml-auto mr-5">
                <li className="nav-item">
                  <Link to="/user_login" className="nav-link signin">Sign In</Link>
                </li>
                <li className="nav-item">
                  <Link to="/user_register" className="nav-link">
                    <button className="btn btn-create">
                      Create Account
                  </button>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      );
    }
    return (
      <Fragment>
        <Navbar color="light" light expand="" className="d-lg-none d-md-block navbar-dark bg-dark">
          <NavbarBrand href="/">MELOTIC</NavbarBrand>
          <NavbarToggler className="float-right" onClick={this.toggleMobile} />
          <Collapse isOpen={this.state.dropdownMobileOpen} navbar className="hamburger-children">
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/" className="black">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap" className="black">GitHub</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap" className="black">GitHub</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap" className="black">GitHub</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <div className="d-none d-md-none d-lg-block header">
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">MELOTIC</Link>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="nav navbar-nav ml-auto mr-5">
                <li className="nav-item">
                  <img src={AvatarPng} className="avatar_logo" />
                </li>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                  <DropdownToggle caret>
                    {currentUser.firstName} {currentUser.lastName}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={this.navigateTo.bind(this, '/')}>Settings</DropdownItem>
                    <DropdownItem onClick={this.navigateTo.bind(this, '/')}>Send Feedback</DropdownItem>
                    <DropdownItem onClick={this.navigateTo.bind(this, '/')}>FAQs</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.navigateTo.bind(this, '/')}>Logout</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </ul>
            </div>
          </nav>
        </div>
      </Fragment>
    );
  }
}

AppNavbar.propTypes = {
  currentUser: PropTypes.object,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default AppNavbar;
