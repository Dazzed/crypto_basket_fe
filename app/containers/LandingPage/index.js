import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose, bindActionCreators } from 'redux';


export class LandingPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>LandingPage</title>
          <meta name="description" content="Description of LandingPage" />
        </Helmet>
        <h1>This is the Landing Page.. Under Construction</h1>
      </div>
    );
  }
}

LandingPage.propTypes = {

};


const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({

  }, dispatch)
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(LandingPage);
