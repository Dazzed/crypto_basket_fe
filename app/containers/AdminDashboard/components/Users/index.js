import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Col
} from 'reactstrap';
import { BrowserRouter as Router } from 'react-router-dom'

import _ from 'lodash';

const upGlyph = (
  <FontAwesome
    name="caret-up"
  />);

const downGlyph = (
  <FontAwesome
    name="caret-down"
  />);

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = { dropdownOpen: false };
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
    return null;
  }

  renderCreateUserButton = () => {
    const {
      startCreatingUser
    } = this.props;
    return (
      <div className="col-md-2 col-4 mt-3">
        <button
          type="button"
          className="btn-create-admin w-100"
          onClick={startCreatingUser}
        >
          Create User
        </button>
      </div>
    );
  }

  onChangeSearch = (e) => {
    const value = e.target.value;
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
    const colorMap = { 'fully_verified': 'table_btn_default', 'unverified': 'table_btn_info', 'verification_pending': 'table_btn_success' };
    return colorMap[value];
  }

  getVerificationString = value => {
    const stringMap = { 'fully_verified': 'VERIFIED', 'unverified': 'REGISTERED', 'verification_pending': 'SUBMITTED', 'all': 'ALL' };
    return stringMap[value];
  }

  incrementPage = () => {
    if (this.props.adminDashboard.usersPage < Math.floor(this.props.adminDashboard.users.length / 10) + 1) {
      this.props.changePage(this.props.adminDashboard.usersPage + 1);
    }
  }

  decrementPage = () => {
    if (this.props.adminDashboard.usersPage > 1) {
      this.props.changePage(this.props.adminDashboard.usersPage - 1);
    }
  }

  firstPage = () => {
    this.props.changePage(1);
  }

  lastPage = () => {
    this.props.changePage(Math.floor(this.props.adminDashboard.users.length / 10) + 1);
  }

  openUser = user => {
    this.props.startEditingUser(user);
    this.props.fetchUser(user.id);
    this.props.history.push(`/dashboard/user/${user.id}`);
  }
  render() {
    const maxPage = Math.floor(this.props.adminDashboard.users.length / 10) + 1;
    const page = this.props.adminDashboard.usersPage;
    const users = this.props.adminDashboard.users ? _.slice(this.props.adminDashboard.users, (page - 1) * 10, page * 10) : []
    return (
      <div className="col-12 col-lg-9 col-md-12 h-100 content_section">
        <div className="row">
          <div className="col-md-8 col-4">
            <h2 className="p-4">Users</h2>
          </div>
          {this.renderCreateUserButton()}
          {this.renderCreateAdminButton()}
        </div>
        <div className="row mt-3  bg_white">
          <div className="col-lg-12">
            <div className="row mt-4 p-4">
              <div className="col-lg-6 col-md-12">
                <input type="text" className="field_input" placeholder="Search by name, email address or username" value={this.props.adminDashboard.usersSearch} onChange={this.onChangeSearch} />
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
                              <DropdownItem onClick={this.filterVerified}>VERIFIED</DropdownItem>
                              <DropdownItem onClick={this.filterPending}>SUBMITTED</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                          {/*<i className="fa fa-caret-down ml-1" />*/}
                        </th>
                      </tr>
                    </thead>
                    <tbody>

                      {users.map((elem, index) => {
                        const changeUser = () => {
                          this.openUser(elem);
                        };
                        return (
                          <tr onClick={changeUser} key={`user_${index}`}>
                            <td>
                              {elem.email}
                            </td>
                            <td>{elem.firstName}</td>
                            <td>{elem.lastName}</td>
                            <td>{elem.username}</td>
                            <td className="text-center">
                              <span className={this.getColor(elem.verificationStatus)}>
                                {this.getVerificationString(elem.verificationStatus)}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <Row>
                  <Col sm={{ size: 1, order: 1, offset: 5 }} >
                    <Pagination>
                      <PaginationItem onClick={this.decrementPage}>
                        <PaginationLink previous />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink onClick={this.firstPage} className={page === 1 ? "selected" : ""}>
                          1
                        </PaginationLink>
                      </PaginationItem>
                      {page > 3 ? (<PaginationItem>
                        <PaginationLink>
                          ...
                        </PaginationLink>
                      </PaginationItem>) : null}
                      {_.map([1, 2, 3], elem => {
                        const currentPage = page > 3 ? page + (elem - 2) : elem + 1;
                        const changePage = () => {
                          this.props.changePage(currentPage);
                        }
                        console.log('elem+1', elem + 1, 'page-(elem-2)', page - (elem - 2), 'elem-2', elem - 2, 'out', currentPage);
                        return maxPage >= currentPage ? (<PaginationItem onClick={changePage} key={`pagination_${elem}`}>
                          <PaginationLink className={page === currentPage ? "selected" : ""}>
                            {currentPage}
                          </PaginationLink>
                        </PaginationItem>) : null;
                      })}
                      {page < maxPage - 2 ? (<PaginationItem>
                        <PaginationLink>
                          ...
                        </PaginationLink>
                      </PaginationItem>) : null}
                      {maxPage > Math.max(4, page + 1) ? (<PaginationItem onClick={this.lastPage}>
                        <PaginationLink className={page === maxPage ? "selected" : ""}>
                          {maxPage}
                        </PaginationLink>
                      </PaginationItem>) : null}
                      <PaginationItem>
                        <PaginationLink next onClick={this.incrementPage} />
                      </PaginationItem>
                    </Pagination>
                  </Col>
                </Row>
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
  startCreatingAdmin: PropTypes.func.isRequired,
  startCreatingUser: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
};
