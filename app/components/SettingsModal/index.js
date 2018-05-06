import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Modal, 
  Row,
  Col
} from 'reactstrap';
const emailText = "Please enter a new email address below, a notification email will be sent to the old address and a verification email will be sent to the new one you have provided.";

class SettingsModal extends React.Component {
  render() {
    const {
      currentUser
    } = this.props;
    const changeText = `Please enter a new ${this.props.fieldNameText}. This will not change the users current verification status, and they will not be notified of this change.`;
      return (
        <Modal isOpen={this.props.isOpen}>
          <Row>
            Are you sure you want to change this user's {this.props.fieldNameText}?
          </Row>
          <Row>
            {this.props.fieldName==='email' ? emailText : changeText}
          </Row>

        </Modal>
      );
    }

  }
}

SettingsModal.propTypes = {
  onSubmit: PropTypes.object,
  fieldName: PropTypes.object.isRequired,
  fieldNameText: PropTypes.object.isRequired,
  isOpen: PropTypes.func,
};

export default AppNavbar;
