import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Pagination, 
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import { BrowserRouter as Router } from 'react-router-dom'

import _ from 'lodash';

const upGlyph = (
  <FontAwesome
    name='caret-up'
  />);

const downGlyph = (
  <FontAwesome
    name='caret-down'
  />);

export default class Users extends Component {
  constructor(props){
    super(props);
    this.state = {query: "", dropdownOpen: false};
  }
  componentWillMount() {
    this.props.fetchUsers();
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
  onChangeSearch = (e) => {
    const value = e.target.value;
    this.setState({query: value});
    this.props.updateSearch(value);
  }

  filterAll = () => {
    this.props.filterVerification("all");
  }

  filterVerified = () => {
    this.props.filterVerification("fully_verified");
  }

  filterUnverified = () => {
    this.props.filterVerification("unverified");
  }

  filterPending = () => {
    this.props.filterVerification("verification_pending");
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  reorder = () => {
    this.props.swapOrdering();
  }

  getColor = value => {
    const colorMap = {'fully_verified': 'table_btn_default', 'unverified': 'table_btn_info', 'verification_pending': 'table_btn_success'};
    return colorMap[value];
  }

  getVerificationString = value => {
    const stringMap = {'fully_verified': 'VERIFIED', 'unverified': 'REGISTERED', 'verification_pending': 'SUBMITTED', 'all': 'ALL'};
    return stringMap[value];
  }

  incrementPage = () => {
    if(this.props.adminDashboard.usersPage < Math.floor(this.props.adminDashboard.users.length/10) + 1){
      this.props.changePage(this.props.adminDashboard.usersPage + 1);
    }
  }

  decrementPage = () => {
    if(this.props.adminDashboard.usersPage > 1){
      this.props.changePage(this.props.adminDashboard.usersPage - 1);
    }
  }

  firstPage = () => {
    this.props.changePage(1);
  }

  lastPage = () => {
    this.props.changePage(Math.floor(this.props.adminDashboard.users.length/10) + 1);
  }

  openUser = user => {
    this.props.startEditingUser(user);
    this.props.history.push(`/dashboard/user/${user.id}`);
  }
  render() {
    const maxPage = Math.floor(this.props.adminDashboard.users.length/10) + 1;
    const page = this.props.adminDashboard.usersPage;
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
                <input type="text" className="field_input" placeholder="Search by name, email address or username" value={this.state.query} onChange={this.onChangeSearch}/>
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
                        <th onClick={this.reorder}>Email Address {this.props.adminDashboard.usersOrder === 'email ASC' ? upGlyph : downGlyph}</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>User ID</th>
                        <th className="text-center">
                          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="verification-dropdown">
                            <DropdownToggle caret>
                              Verification Status: {this.getVerificationString(this.props.adminDashboard.usersVerification)}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem onClick={this.filterAll}>ALL</DropdownItem>
                              <DropdownItem onClick={this.filterUnverified}>REGISTERED</DropdownItem>
                              <DropdownItem onClick={this.filterVerified}>Verified</DropdownItem>
                              <DropdownItem onClick={this.filterPending}>SUBMITTED</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                          {/*<i className="fa fa-caret-down ml-1" />*/}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      
                      {this.props.adminDashboard.users ? this.props.adminDashboard.users.map(elem=>{
                        const changeUser = () => {
                          this.openUser(elem);
                        }
                        return (
                          <tr onClick={changeUser}>
                              <td>
                                <a href="admin_user_profile.html"> {elem.email}</a>
                              </td>
                              <td>{elem.firstName}</td>
                              <td>{elem.lastName}</td>
                              <td>{elem.id}</td>
                              <td className="text-center">
                                <span className={this.getColor(elem.verificationStatus)}>
                                  {this.getVerificationString(elem.verificationStatus)}
                                </span>
                              </td>
                          </tr>
                        );
                      }) : null}
                    </tbody>
                  </table>
                </div>

                <Pagination>
                  <PaginationItem onClick={this.decrementPage}>
                    <PaginationLink previous />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink onClick={this.firstPage}>
                      1
                    </PaginationLink>
                  </PaginationItem>
                    {page>3 ? (<PaginationItem>
                    <PaginationLink>
                      ...
                    </PaginationLink>
                  </PaginationItem>) : null}
                  {}
                  <PaginationItem onClick={this.decrementPage}>
                    <PaginationLink>
                      {Math.max(2, page-1)}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem className="selected" >
                    <PaginationLink>
                      {Math.max(3, page)}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem onClick={this.incrementPage} >
                    <PaginationLink>
                      {Math.max(4, page+1)}
                    </PaginationLink>
                  </PaginationItem>
                  { (page < maxPage - 3) ? (<PaginationItem>
                    <PaginationLink>
                      ...
                    </PaginationLink>
                  </PaginationItem>) : null}
                  <PaginationItem onClick={this.lastPage}>
                    <PaginationLink>
                      {maxPage}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink next onClick={this.incrementPage}/>
                  </PaginationItem>
                </Pagination>
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
