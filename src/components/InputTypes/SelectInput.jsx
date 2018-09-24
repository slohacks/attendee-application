import React from 'react';
import PropTypes from 'prop-types';

const SelectInput = ({
  input,
  label,
  options,
  disabled,
  meta: { touched, error },
}) => {
  function renderOptions() {
    return Object.keys(options).map((option) => { // eslint-disable-line arrow-body-style
      return (
        <option key={option} value={options[option]}>
          {option}
        </option>
      );
    });
  }

  return (
    <div>
      <label htmlFor="value">
        {label}
      </label>
      <select {...input} disabled={disabled}>
        <option />
        {renderOptions()}
      </select>
      <div className="error-message">
        {touched ? error : ''}
      </div>
    </div>
  );
};

SelectInput.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({}).isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  disabled: PropTypes.bool.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
};

export default SelectInput;
