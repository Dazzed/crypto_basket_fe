import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  render() {
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
}

Navbar.propTypes = {

};

export default Navbar;
