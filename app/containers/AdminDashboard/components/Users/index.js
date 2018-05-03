import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Users extends Component {
  componentWillMount() {
    this.props.fetchUsers("");
  }
  renderCreateAdminButton = () => {
    const {
      isSuperAdmin,
      globalData: {
        currentUser: {
          twoFactorCreateAdminEnabled,
          twoFactorToken
        }
      },
      startCreatingAdmin,
      startEnablingTFAAdmin
    } = this.props;
    if (isSuperAdmin) {
      let onClick;
      if (twoFactorCreateAdminEnabled) {
        onClick = startCreatingAdmin;
      } else {
        onClick = startEnablingTFAAdmin.bind(this, twoFactorToken);
      }
      return (
        <div className="col-md-2 col-4 mt-3">
          <button
            type="button"
            className="btn-create-admin w-100"
            onClick={onClick}
          >
            Create Admin
          </button>
        </div>
      );
    }
  }

  render() {
    console.log('this.props', this.props);
    return (
      <div className="col-12 col-lg-9 col-md-12 h-100 content_section">
        <div className="row">
          <div className="col-md-8 col-4">
            <h2 className="p-4">Users</h2>
          </div>
          <div className="col-md-2 col-4 mt-3">
            <button type="button" className="btn-create-admin w-100">Create User</button>
          </div>
          {this.renderCreateAdminButton()}
        </div>
        <div className="row mt-3  bg_white">
          <div className="col-lg-12">
            <div className="row mt-4 p-4">
              <div className="col-lg-6 col-md-12">
                <input type="text" className="field_input" placeholder="Search by name, email address or username" />
              </div>
            </div>
          </div>
          <div className="col-lg-12 h-100">
            <div className="row mt-4 p-4">
              <div className="col-lg-12 col-md-12">
                {/* visible medium and large devices */}
                
                <div className="users_list table-responsive d-none d-sm-none d-md-block">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Email Address</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>User ID</th>
                        <th className="text-center">Verification Status:All
                    <i className="fa fa-caret-down ml-1" />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      
                      {this.props.adminDashboard.users.map(elem=>{

                        return (
                          <tr>
                              <td>
                                <a href="admin_user_profile.html"> {elem.email}</a>
                              </td>
                              <td>{elem.firstName}</td>
                              <td>{elem.lastName}</td>
                              <td>{elem.username}</td>
                              <td className="text-center">
                                <span className="table_btn_info">
                                  {elem.verificationStatus.toUpperCase()}
                                </span>
                              </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Users.propTypes = {
  globalData: PropTypes.object.isRequired,
  adminDashboard: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isSuperAdmin: PropTypes.bool.isRequired,
  startEnablingTFAAdmin: PropTypes.func.isRequired,
  openOtpModal: PropTypes.func.isRequired,
  showToastSuccess: PropTypes.func.isRequired,
  showToastError: PropTypes.func.isRequired,
  startCreatingAdmin: PropTypes.func.isRequired
};
