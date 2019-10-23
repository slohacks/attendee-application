import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ErrorText from './ErrorText';

const TextInput = ({
  input,
  type,
  label,
  disabled,
  placeholder,
  meta: { touched, error },
}) => {
  const errorExist = touched && Boolean(error);
  return (
    <InputContainer>
      {label && <LabelContainer error={errorExist}>{label}</LabelContainer>}
      <InputField
        {...input}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        error={errorExist}
      />
      {errorExist && <ErrorText error={error} />}
    </InputContainer>
  );
};

const LabelContainer = styled.label`
  color: ${props => (props.error ? 'red' : 'black')};
`;

const InputContainer = styled.div`
  font-family: 'Proxima Nova';
`;

const InputField = styled.input`
  width: 100%;
  border: 2px solid ${props => (props.error ? 'red' : 'grey')};
  padding: .5rem;
  margin-bottom: .85rem;

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
