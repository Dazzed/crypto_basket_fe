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

  handleCreateAccountClick = () => {
    if (this.props.location.pathname.includes('/user_register')) {
      window.location.reload();
    }
  }

  renderRegularUser = () => {
    const {
      currentUser
    } = this.props;
    return (
      <Fragment>
        <div>
          <Navbar color="light" light expand="" className="d-lg-none d-md-block navbar-dark bg-dark">
            <NavbarBrand href="/">MELOTIC</NavbarBrand>
            <NavbarToggler className="float-right" onClick={this.toggleMobile} />
            <Collapse isOpen={this.state.dropdownMobileOpen} navbar className="hamburger-children" style={{ zIndex: 2 }}>
              <Nav className="text-left pl-5" navbar>
                {/* <NavItem>
                  <NavLink href="/components/" className="black">Components</NavLink>
                </NavItem> */}
                <NavItem>
                  <div className="row p-4">
                    <div className="col-1">
                      <img src={AvatarPng} className="avatar_logo" />
                    </div>
                    <div className="col-8 text-left pt-1">
                      <h5>{`${currentUser.firstName} ${currentUser.lastName}`}</h5>
                    </div>
                    <div className="col-3 pt-1 cursor-pointer">
                      <small><a onClick={this.props.logOutRequest} className="melotic-green">Logout</a></small>
                    </div>
                  </div>
                </NavItem>
                <br />
                <NavItem>
                  <Link onClick={this.toggleMobile} to="/dashboard" style={{ color: '#76837B' }}>Dashboard</Link>
                </NavItem>
                <br />
                <NavItem>
                  <Link onClick={this.toggleMobile} to="/dashboard/buy" style={{ color: '#76837B' }}>Buy</Link>
                </NavItem>
                <br />
                <NavItem>
                  <Link onClick={this.toggleMobile} to="/dashboard/sell" style={{ color: '#76837B' }}>Sell</Link>
                </NavItem>
                <br />
                <NavItem>
                  <Link onClick={this.toggleMobile} to="/dashboard/deposit" style={{ color: '#76837B' }}>Deposit</Link>
                </NavItem>
                <br />
                <NavItem>
                  <Link onClick={this.toggleMobile} to="/dashboard/withdraw" style={{ color: '#76837B' }}>Withdraw</Link>
                </NavItem>
                <br />
                <br />
                <NavItem>
                  <Link onClick={this.toggleMobile} to="/dashboard/activity" style={{ color: '#76837B' }}>Activity</Link>
                </NavItem>
                <br />
                <br />
                <NavItem>
                  <Link onClick={this.toggleMobile} to="/dashboard/settings" style={{ color: '#76837B' }}>Settings</Link>
                </NavItem>
                <br />
                <NavItem>
                  <Link onClick={this.toggleMobile} to="/dashboard/faqs" style={{ color: '#76837B' }}>FAQs</Link>
                </NavItem>
                <br />
                <NavItem>
                  <a onClick={() => { this.toggleMobile(); this.props.openFeedbackModal(); }} style={{ color: '#76837B' }}>Send Feedback</a>
                </NavItem>
                <br />
                <NavItem>
                  <a onClick={() => { this.toggleMobile(); this.props.logOutRequest(); }} style={{ color: '#76837B' }}>Logout</a>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
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
                    <DropdownItem onClick={this.navigateTo.bind(this, '/dashboard/settings')}>Settings</DropdownItem>
                    <DropdownItem onClick={this.props.openFeedbackModal}>Send Feedback</DropdownItem>
                    <DropdownItem onClick={this.navigateTo.bind(this, '/dashboard/faqs')}>FAQs</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.props.logOutRequest}>Logout</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </ul>
            </div>
          </nav>
        </div>
      </Fragment>
    );
  }

  renderAdmin = () => {
    const {
      currentUser
    } = this.props;
    return (
      <Fragment>
        <Navbar color="light" light expand="" className="d-lg-none d-md-block navbar-dark bg-dark">
          <NavbarBrand href="/">MELOTIC</NavbarBrand>
          <NavbarToggler className="float-right" onClick={this.toggleMobile} />
          <Collapse isOpen={this.state.dropdownMobileOpen} navbar className="hamburger-children" style={{ zIndex: 2 }}>
            <Nav className="text-left pl-5" navbar>
              <NavItem>
                <Link onClick={this.toggleMobile} to="/dashboard/users" style={{ color: '#76837B' }}>Users</Link>
              </NavItem>
              <br />
              <NavItem>
                <Link onClick={this.toggleMobile} to="/dashboard/activity" style={{ color: '#76837B' }}>Activity</Link>
              </NavItem>
              <br />
              <NavItem>
                <Link onClick={this.toggleMobile} to="/dashboard/assets" style={{ color: '#76837B' }}>Assets</Link>
              </NavItem>
              <br />
              <NavItem>
                <a onClick={() => { this.toggleMobile(); this.props.logOutRequest(); }} style={{ color: '#76837B' }}>Logout</a>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <div className="d-none d-md-none d-lg-block header">
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">MELOTIC ADMIN</Link>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="nav navbar-nav ml-auto mr-5 mr-4-5-p">
                <li className="nav-item">
                  <img src={AvatarPng} className="avatar_logo" />
                </li>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                  <DropdownToggle caret>
                    {currentUser.firstName} {currentUser.lastName}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={this.props.logOutRequest}>Logout</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </ul>
            </div>
          </nav>
        </div>
      </Fragment>
    );
  }

  render() {
    const {
      currentUser
    } = this.props;
    if (!currentUser) {
      return (
        <Fragment>
          <Navbar color="light" light expand="" className="d-lg-none d-md-block navbar-dark bg-dark">
            <NavbarBrand href="/">MELOTIC</NavbarBrand>
            <NavbarToggler className="float-right" onClick={this.toggleMobile} />
            <Collapse isOpen={this.state.dropdownMobileOpen} navbar className="hamburger-children" style={{ zIndex: 2 }}>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link onClick={this.toggleMobile} to="/user_login" className="black">Log In</Link>
                </NavItem>
                <NavItem>
                  <Link onClick={this.toggleMobile} to="/user_register" className="black">Create Account</Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <div className="d-none d-md-none d-lg-block header">
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
              <Link to="/" className="navbar-brand">MELOTIC {this.props.location.pathname.includes('admin') && 'ADMIN'}</Link>
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
                      <button className="btn btn-create" onClick={this.handleCreateAccountClick}>
                        Create Account
                    </button>
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </Fragment>
      );
    }
    const {
      roleMapping
    } = currentUser;
    if (!roleMapping) {
      return this.renderRegularUser();
    }
    const {
      role
    } = roleMapping;
    if (role.name === 'super_admin' || role.name === 'admin') {
      return this.renderAdmin();
    }
    return null;
  }
}

AppNavbar.propTypes = {
  currentUser: PropTypes.object,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  logOutRequest: PropTypes.func,
  openFeedbackModal: PropTypes.func,
};

export default AppNavbar;
