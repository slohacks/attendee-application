import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ErrorText } from '../../common';

const TextInput = ({
  input,
  type,
  disabled,
  placeholder,
  meta: { touched, error },
}) => {
  const errorExist = touched && Boolean(error);
  return (
    <InputContainer>
      <InputField
        {...input}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        error={errorExist}
      />
      {errorExist && <ErrorText>{error}</ErrorText>}
    </InputContainer>
  );
};

const InputContainer = styled.div`
  font-family: 'Proxima Nova';
`;

const InputField = styled.input`
  width: 100%;
  border: 2px solid ${props => (props.error ? 'red' : 'grey')};
  padding: .75rem .5rem;
  margin: .5rem 0;

  ::-webkit-input-placeholder {
    font-family: 'Proxima Nova', sans-serif;
  }
  ::-moz-placeholder {
    font-family: 'Proxima Nova', sans-serif;
  }
  :-ms-input-placeholder {
    font-family: 'Proxima Nova', sans-serif;
  }
  :-moz-placeholder {
    font-family: 'Proxima Nova', sans-serif;
  }

`;

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({}).isRequired,
  disabled: PropTypes.bool,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};
TextInput.defaultProps = {
  placeholder: null,
  type: null,
  disabled: false,
};

export default TextInput;
