import React from 'react';
import PropTypes from 'prop-types';

const DateInput = ({
  input,
  label,
  disabled,
  meta: { touched, error },
}) => (
  <div>
    <label htmlFor="value">
      {label}
      <input type="date" {...input} disabled={disabled} />
    </label>
    <div className="error-message">
      {touched ? error : ''}
    </div>
  </div>
);

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
