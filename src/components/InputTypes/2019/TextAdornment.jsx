import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ErrorText } from '../../common';

const TextAdornment = ({
  input,
  label,
  type,
  disabled,
  adornment,
  meta: { touched, error },
}) => {
  const errorExist = touched && Boolean(error);
  return (
    <InputContainer>
      {label && <p>{label}</p>}
      <InputWrapper error={errorExist}>
        <p>{adornment}</p>
        <InputField
          {...input}
          type={type}
          disabled={disabled}
        />
      </InputWrapper>
      {errorExist && <ErrorText>{error}</ErrorText>}
    </InputContainer>
  );
};

const InputContainer = styled.div`
  font-family: 'Proxima Nova';

  p {
    margin: .25rem 0;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 2px solid ${props => (props.error ? 'red' : 'grey')};
  margin: .5rem 0;
  padding: .25rem .5rem;
  p {
    margin: 0;
    color: grey;
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 0 .25rem;
  margin: .5rem 0;
  border: none;

  &:focus {
    outline: none;
  }

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

TextAdornment.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({}).isRequired,
  disabled: PropTypes.bool,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  adornment: PropTypes.string.isRequired,
};
TextAdornment.defaultProps = {
  placeholder: null,
  type: null,
  disabled: false,
};

export default TextAdornment;
