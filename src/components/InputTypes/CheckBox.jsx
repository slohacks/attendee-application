import React from 'react';
import PropTypes from 'prop-types';
import CheckBox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';

const CheckInput = ({
  input,
  label,
  disabled,
  meta: { touched, error },
}) => {
  return (
    <div
      style={{ marginBottom: '1rem' }}
    >
      <InputLabel error={touched && Boolean(error)}>
        {label}
      </InputLabel>
      <CheckBox
        {...input}
        value={String(input.value)}
        checked={input.value}
        disabled={disabled}
        style={{
          paddingTop: 0,
          paddingBottom: 0,
        }}
      />
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
