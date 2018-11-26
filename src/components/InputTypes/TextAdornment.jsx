import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const TextAdornment = ({
  input,
  type,
  label,
  disabled,
  adornment,
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
      InputProps={{
        startAdornment:
  <InputAdornment position="start">
    {adornment}
  </InputAdornment>,
      }}
    />
  );
};


TextAdornment.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({}).isRequired,
  disabled: PropTypes.bool,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
  type: PropTypes.string,
  adornment: PropTypes.string.isRequired,
};

export default TextAdornment;
