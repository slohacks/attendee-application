import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ErrorText = ({ error }) => {
  return (
    <ErrorMessage>{error}</ErrorMessage>
  );
};

const ErrorMessage = styled.p`
  color: red;
  margin: 0 0 .5rem 0;
`;

ErrorText.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ErrorText;
