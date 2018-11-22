import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';

const TextArea = ({
  input,
  label,
  disabled,
  meta: { touched, error },
}) => {
  const errorExist = touched && Boolean(error);
  return (
    <div>
      <InputLabel error={errorExist}>
        {label}
      </InputLabel>
      <br />
      <TextField
        multiline
        rows="4"
        fullwidth="true"
        helperText={errorExist ? error : ''}
        error={errorExist}
        {...input}
        disabled={disabled}
        style={{ marginBottom: '1rem' }}
      />
    </div>
  );
};
TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({}).isRequired,
  disabled: PropTypes.bool.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
};
export default TextArea;
