import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ListInput = (props) => {
  const {
    meta: { touched, error },
    label,
  } = props;
  const errorExist = touched && Boolean(error);
  return (
    <InputContainer>
      {label && <p>{label}</p>}
      <InputField
        {...props}
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
  width: 100%;
  height: 43px;
  outline: none;
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

ListInput.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};
ListInput.defaultProps = {
  placeholder: null,
  type: null,
  disabled: false,
  label: '',
};

export default ListInput;
