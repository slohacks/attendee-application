import React from 'react';
import PropTypes from 'prop-types';

const CheckboxInput = ({
  input,
  label,
  disabled,
  defaultChecked,
  meta: { touched, error },
}) => (
  <div>
    <label htmlFor="value">
      {label}
      <input type="checkbox" {...input} disabled={disabled} value={defaultChecked} />
    </label>
    <div className="error-message">
      {touched ? error : ''}
    </div>
  </div>
);

CheckboxInput.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({}).isRequired,
  disabled: PropTypes.bool.isRequired,
  defaultChecked: PropTypes.bool.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
};

export default CheckboxInput;
