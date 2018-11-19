import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const TextInput = ({
  input,
  label,
  disabled,
  meta: { touched, error },
}) => {
  const errorExist = touched && Boolean(error);
  return (
    <TextField fullWidth label={label} helperText={errorExist ? error : ''} error={errorExist} {...input} disabled={disabled} />
  );
};


TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({}).isRequired,
  disabled: PropTypes.bool.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
};

export default TextInput;
