import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import moment from 'moment';

import superCompare from 'helpers/superCompare';
import MyInformation from './components/MyInformation';
import Verification from './components/Verification';

class Settings extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    performPatchingUser: PropTypes.func.isRequired,
    showToastSuccess: PropTypes.func.isRequired,
    showToastError: PropTypes.func.isRequired,
    globalData: PropTypes.object.isRequired,
    performUploadingIdentity: PropTypes.func.isRequired,
    performUploadingProof: PropTypes.func.isRequired
  };

  onUpdateMyInformation = values => {
    console.log(values);
  }

  onSubmitVerification = values => {
    // 1. Construct data to patch user model related fields
    const {
      globalData: {
        currentUser: {
          country,
          state,
          dob
        }
      },
      showToastSuccess,
      showToastError
    } = this.props;
    const originalFieldsData = {
      country,
      state,
      dob: moment(dob).format('YYYY-MM-DD')
    };
    const fieldValuesFromReduxForm = {
      country: values.country,
      state: values.state,
      dob: values.dob.format('YYYY-MM-DD')
    };
    const diffInFieldValues = superCompare(originalFieldsData, fieldValuesFromReduxForm);
    if (Object.keys(diffInFieldValues).length) {
      this.props.performPatchingUser(
        this.props.globalData.currentUser,
        diffInFieldValues,
        showToastSuccess,
        showToastError
      );
    }
    // 2. Construct file fields
    if (values.identityDocument) {
      this.props.performUploadingIdentity(values.identityDocument, showToastSuccess, showToastError);
    }
    if (values.proofDocument) {
      this.props.performUploadingProof(values.proofDocument, showToastSuccess, showToastError);
    }
  }

  render() {
    const { match } = this.props;
    return (
      <div className="col-12 col-lg-9 col-md-12 h-100 content_section">
        <h2 className="p-4">Settings</h2>
        <div className="text-left tab_settings mt-3 pb-0 pt-0 pl-5">
          <span className={`pb-3 ${location.pathname.includes('my_information') ? 'active_tab_title' : 'tab_title'}`}>
            <NavLink exact to={`${match.url}/my_information`}>My Information</NavLink>
          </span>
          <span className={`${location.pathname.includes('verification') ? 'active_tab_title' : 'tab_title'} pb-3 ml-5`}>
            <NavLink exact to={`${match.url}/verification`}>Verification</NavLink>
          </span>
        </div>
        <Switch>
          <Route
            exact
            path={`${match.url}/my_information`}
            render={props =>
              <MyInformation {...this.props} {...props} onSubmit={this.onUpdateMyInformation} />
            }
          />
          <Route
            exact
            path={`${match.url}/verification`}
            render={props => <Verification {...this.props} {...props} onSubmit={this.onSubmitVerification} />}
          />
          <Redirect from={`${match.url}`} to={`${match.url}/my_information`} />
        </Switch>
      </div>
    );
  }
}

export default Settings;
