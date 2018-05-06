import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { 
  TabContent, 
  TabPane, 
  Nav, 
  NavItem, 
  NavLink, 
  Card, 
  Button, 
  CardTitle, 
  CardText, 
  Row, 
  Col
} from 'reactstrap';
import {  } from 'reactstrap';
import _ from 'lodash';
import classnames from 'classnames';

export default class User extends Component {
  constructor(props){
    super(props);
    this.state = {activeTab: 'profile'};
  }
  componentWillMount() {

  }
  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  resetPassword = () => {
    console.log('resetting pass');
    this.props.resetUserPassword(this.props.adminDashboard.editingUser.email);
  }

  archiveUser = () => {
    this.props.archiveUser(this.props.adminDashboard.editingUser.id);
  }

  render() {
    console.log('user', this.props.adminDashboard.editingUser);
    const user = this.props.adminDashboard.editingUser;
    return (
      <div className="col-12 col-lg-9 col-md-12 h-100 content_section">
        <div className="row">
          <div className="col-md-8 col-4">
            <h2 className="p-4">{user.firstName} {user.lastName}</h2>
          </div>
          <div className="col-md-2 col-4 mt-3">
            <button type="button" className="btn-create-admin w-100" onClick={this.resetPassword}>Reset Password</button>
          </div>
          <div className="col-md-2 col-4 mt-3">
            <button type="button" className="btn-create-admin w-100" onClick={this.archiveUser}>Archive User</button>
          </div>
        </div>
          <Nav tabs className="row col-md-4 tab-nav-container">
            <NavItem className="col-md-4 tab-nav-item ">
              <NavLink
                className={classnames({ active: this.state.activeTab === 'profile' })}
                onClick={() => { this.toggle('profile'); }}
              >
                Profile
              </NavLink>
            </NavItem>
            <NavItem className="col-md-4 tab-nav-item ">
              <NavLink
                className={classnames({ active: this.state.activeTab === 'assets' })}
                onClick={() => { this.toggle('assets'); }}
              >
                Assets
              </NavLink>
            </NavItem>
            <NavItem className="col-md-4 tab-nav-item ">
              <NavLink
                className={classnames({ active: this.state.activeTab === 'activity' })}
                onClick={() => { this.toggle('activity'); }}
              >
                Activity
              </NavLink>
            </NavItem>
          </Nav>
        <div className="row mt-3  bg_white clear-top-padding">
          <TabContent activeTab={this.state.activeTab} className="tab-content-container">
            <TabPane tabId="profile">
                <Row className="tab-content-row">
                  <Col sm={{ size: 2, order: 1, offset: 0 }} className="left">
                  Username
                  </Col>
                  <Col sm={{ size: 1, order: 2, offset: 7 }} className="right">
                    {user.username}
                  </Col>
                  <Col sm={{ size: 1, order: 3, offset: 0 }}> 
                    <Button>Change</Button>
                  </Col>
                </Row>
                <Row className="tab-content-row">
                  <Col sm={{ size: 3, order: 1, offset: 0 }} className="left">
                  Email Address
                  </Col>
                  <Col sm={{ size: 3, order: 2, offset: 4 }} className="right">
                    {user.email}
                  </Col>
                  <Col sm={{ size: 1, order: 3, offset: 0 }}> 
                    <Button>Change</Button>
                  </Col>
                </Row>
                <Row className="tab-content-row">
                  <Col sm={{ size: 3, order: 1, offset: 0 }} className="left">
                  State of Residence
                  </Col>
                  <Col sm={{ size: 2, order: 2, offset: 5 }} className="right">
                    {user.state}
                  </Col>
                  <Col sm={{ size: 1, order: 3, offset: 0 }}> 
                    <Button>Change</Button>
                  </Col>
                </Row>
                <Row className="tab-content-row">
                  <Col sm={{ size: 3, order: 1, offset: 0 }} className="left">
                  Date of Birth
                  </Col>
                  <Col sm={{ size: 2, order: 2, offset: 5 }} className="right">
                    {user.dob}
                  </Col>
                  <Col sm={{ size: 1, order: 3, offset: 0 }}> 
                    <Button>Change</Button>
                  </Col>
                </Row>
                <Row className="tab-content-row">
                  <Col sm={{ size: 2, order: 1, offset: 0 }} className="left">
                  Country
                  </Col>
                  <Col sm={{ size: 2, order: 2, offset: 6 }} className="right">
                    {user.country}
                  </Col>
                  <Col sm={{ size: 1, order: 3, offset: 0 }}> 
                    <Button>Change</Button>
                  </Col>
                </Row>
                <Row className="tab-content-row">
                  <Col sm={{ size: 3, order: 1, offset: 0 }} className="left">
                  Verification Status
                  </Col>
                  <Col sm={{ size: 2, order: 2, offset: 5 }} className="right">
                    {user.verificationStatus}
                  </Col>
                  <Col sm={{ size: 1, order: 3, offset: 0 }}> 
                    <Button>Change</Button>
                  </Col>
                </Row>
                <Row className="tab-content-row">
                  <Col sm={{ size: 3, order: 1, offset: 0 }} className="left">
                  Withdrawal Limit
                  </Col>
                  <Col sm={{ size: 2, order: 2, offset: 5 }} className="right">
                    0
                  </Col>
                  <Col sm={{ size: 1, order: 3, offset: 0 }}> 
                    <Button>Change</Button>
                  </Col>
                </Row>
                <Row className="tab-content-row">
                  <Col sm={{ size: 3, order: 1, offset: 0 }} className="left">
                  BTC Wallet Value
                  </Col>
                  <Col sm={{ size: 2, order: 2, offset: 5 }} className="right">
                    0
                  </Col>
                  <Col sm={{ size: 1, order: 3, offset: 0 }}> 
                    <Button>Change</Button>
                  </Col>
                </Row>
                <Row className="tab-content-row">
                  <Col sm={{ size: 3, order: 1, offset: 0 }} className="left">
                  ETH Wallet Value
                  </Col>
                  <Col sm={{ size: 2, order: 2, offset: 5 }} className="right">
                    0
                  </Col>
                  <Col sm={{ size: 1, order: 3, offset: 0 }}> 
                    <Button>Change</Button>
                  </Col>
                </Row>
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }
}

User.propTypes = {
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