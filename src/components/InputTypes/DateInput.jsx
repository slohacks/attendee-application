import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';

const DateInput = ({
  input,
  label,
  disabled,
  meta: { touched, error },
}) => {
  const errorExist = touched && Boolean(error);
  return (
    <div>
      <FormLabel error={errorExist}>
        {label}
      </FormLabel>
      <TextField type="date" fullWidth helperText={errorExist ? error : ''} error={errorExist} {...input} disabled={disabled} />
    </div>
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
