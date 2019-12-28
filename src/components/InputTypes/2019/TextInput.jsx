import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TextInput = ({
  input,
  label,
  type,
  disabled,
  placeholder,
  meta: { touched, error },
}) => {
  const errorExist = touched && Boolean(error);
  return (
    <InputContainer>
      {label && <p>{label}</p>}
      <InputField
        {...input}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        error={errorExist}
      />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  font-family: 'Proxima Nova';

  p {
    margin: .25rem 0;
  }
`;

const InputField = styled.input`
  border: 2px solid ${props => (props.error ? 'red' : 'grey')};
  padding: .75rem .5rem;
  margin: .5rem 0;
  border-radius: 3px;

  ::-webkit-input-placeholder {
    font-family: 'Proxima Nova', sans-serif;
  }
  ::-moz-placeholder {
    font-family: 'Proxima Nova', sans-serif;
  }
  :-ms-input-placeholder {
    font-family: 'Proxima Novka', sans-serif;
  }
  :-moz-placeholder {
    font-family: 'Proxima Nova', sans-serif;
  }

`;

TextInput.propTypes = {
  label: PropTypes.string,
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
  label: '',
};

export default TextInput;
