import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const DateInput = ({
  input,
  label,
  disabled,
  meta: { touched, error },
}) => {
  const errorExist = touched && Boolean(error);
  return (
    <TextField
      type="date"
      fullWidth
      label={label}
      InputLabelProps={{ shrink: true }}
      helperText={errorExist ? error : ''}
      error={errorExist}
      {...input}
      disabled={disabled}
    />
  );
};

DateInput.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({}).isRequired,
  disabled: PropTypes.bool.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
};

export default DateInput;
