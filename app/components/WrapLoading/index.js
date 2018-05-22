import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../Loading';

const WrapLoading = ({ children, loading, loadingProps }) => loading ?
  <Loading {...loadingProps} /> : children;

WrapLoading.propTypes = {
  children: PropTypes.oneOfType(
    [PropTypes.element, PropTypes.array]
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  loadingProps: PropTypes.object
};

export default WrapLoading;
