import React, { Component } from 'react';

export default class Users extends Component {
  render() {
    return (
      <div className="col-12 col-lg-9 col-md-12 h-100 content_section">
        <div className="row">
          <div className="col-md-8 col-4">
            <h2 className="p-4">Users</h2>
          </div>
          <div className="col-md-2 col-4 mt-3">
            <button type="button" data-toggle="modal" data-target="#create_popup_user" className="btn-create-admin w-100">Create User</button>
          </div>
          <div className="col-md-2 col-4 mt-3">
            <button type="button" data-toggle="modal" data-target="#create_popup_admin" className="btn-create-admin w-100">Create Admin</button>
          </div>
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
                      <tr>
                        <td>
                          <a href="admin_user_profile.html"> a@mail.com
                    </a>
                        </td>
                        <td>Rory</td>
                        <td>Reiff</td>
                        <td>roryreiff</td>
                        <td className="text-center">
                          <span className="table_btn_info">
                            REGISTERED
                    </span>
                        </td>
                      </tr>
                      <tr>
                        <td>a@mail.com</td>
                        <td>Rory</td>
                        <td>Reiff</td>
                        <td>roryreiff</td>
                        <td className="text-center">
                          <span className="table_btn_default">VERIFIED
                    </span>
                        </td>
                      </tr>
                      <tr>
                        <td>a@mail.com</td>
                        <td>Rory</td>
                        <td>Reiff</td>
                        <td>roryreiff</td>
                        <td className="text-center">
                          <span className="table_btn_success">SUBMITTED
                    </span>
                        </td>
                      </tr>
                      <tr>
                        <td>a@mail.com</td>
                        <td>Rory</td>
                        <td>Reiff</td>
                        <td>roryreiff</td>
                        <td className="text-center">
                          <span className="table_btn_success">SUBMITTED
                    </span>
                        </td>
                      </tr>
                      <tr>
                        <td>a@mail.com</td>
                        <td>Rory</td>
                        <td>Reiff</td>
                        <td>roryreiff</td>
                        <td className="text-center">
                          <span className="table_btn_success">SUBMITTED
                    </span>
                        </td>
                      </tr>
                      <tr>
                        <td>a@mail.com</td>
                        <td>Rory</td>
                        <td>Reiff</td>
                        <td>roryreiff</td>
                        <td className="text-center">
                          <span className="table_btn_default">VERIFIED
                    </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="users_list table-responsive d-block d-md-none d-lg-none">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Account</th>
                        <th className="text-right">
                          Verification Status:All
                    <i className="fa fa-caret-down ml-1" />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          roryreiff
                    <div className="mt-1">
                            a@mail.com
                    </div>
                        </td>
                        <td className="text-right">
                          Rory Reiff
                    <div className="mt-1">
                            <span className="table_btn_info">REGISTERED
                      </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          roryreiff
                    <div className="mt-1">
                            a@mail.com
                    </div>
                        </td>
                        <td className="text-right">
                          Rory Reiff
                    <div className="mt-1">
                            <span className="table_btn_default">VERIFIED
                      </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          roryreiff
                    <div className="mt-1">
                            a@mail.com
                    </div>
                        </td>
                        <td className="text-right">
                          Rory Reiff
                    <div className="mt-1">
                            <span className="table_btn_success">SUBMITTED
                      </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          roryreiff
                    <div className="mt-1">
                            a@mail.com
                    </div>
                        </td>
                        <td className="text-right">
                          Rory Reiff
                    <div className="mt-1">
                            <span className="table_btn_success">SUBMITTED
                      </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          roryreiff
                    <div className="mt-1">
                            a@mail.com
                    </div>
                        </td>
                        <td className="text-right">
                          Rory Reiff
                    <div className="mt-1">
                            <span className="table_btn_success">SUBMITTED
                      </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          roryreiff
                    <div className="mt-1">
                            a@mail.com
                    </div>
                        </td>
                        <td className="text-right">
                          Rory Reiff
                    <div className="mt-1">
                            <span className="table_btn_default">VERIFIED</span>
                          </div>
                        </td>
                      </tr>
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
