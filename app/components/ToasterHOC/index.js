import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const ToasterHOC = TargetComponent => {
  return class ToasterHOCClass extends Component {
    showToastSuccess = message => toast.success(message);
    showToastError = message => toast.error(message);

    render() {
      return (
        <React.Fragment>
          <ToastContainer
            hideProgressBar
            autoClose={2500}
          />
          <TargetComponent
            {...this.props}
            showToastSuccess={this.showToastSuccess}
            showToastError={this.showToastError}
          />
        </React.Fragment>
      );
    }
  };
};

export default ToasterHOC;
