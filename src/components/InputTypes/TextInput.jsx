import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const TextInput = ({
  input,
  type,
  label,
  disabled,
  meta: { touched, error },
}) => {
  const errorExist = touched && Boolean(error);
  return (
    <TextField
      type={type}
      fullWidth
      label={label}
      helperText={errorExist ? error : ''}
      error={errorExist}
      {...input}
      disabled={disabled}
      style={{ marginBottom: '1rem' }}
    />
  );
};


TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({}).isRequired,
  disabled: PropTypes.bool,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
  type: PropTypes.string,
};

export default TextInput;
