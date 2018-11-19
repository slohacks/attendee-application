import React from 'react';
import PropTypes from 'prop-types';
import CheckBox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

const CheckInput = ({
  input,
  label,
  disabled,
  meta: { touched, error },
}) => {
  const errorExist = error ? true : false;
  return (
    <div>
      <InputLabel>
        {label}
      </InputLabel>
      <CheckBox {...input} disabled={disabled} checked={input.value} />
      {touched && errorExist ? <FormHelperText>{error}</FormHelperText> : '' }
    </div>
  );
};


CheckInput.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({}).isRequired,
  disabled: PropTypes.bool.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
};

export default CheckInput;
