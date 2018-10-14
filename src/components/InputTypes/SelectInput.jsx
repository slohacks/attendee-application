import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SelectInput extends Component {
  renderOptions() {
    const { options } = this.props;
    return Object.keys(options).map((option) => {
      return (
        <option key={option} value={options[option]}>
          {option}
        </option>
      );
    });
  }

  render() {
    const {
      input,
      label,
      disabled,
      meta: { touched, error },
    } = this.props;
    return (
      <div>
        <label htmlFor="value">
          {label}
        </label>
        <select {...input} disabled={disabled}>
          <option />
          {this.renderOptions()}
        </select>
        <div className="error-message">
          {touched ? error : ''}
        </div>
      </div>
    );
  }
}

SelectInput.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({}).isRequired,
  options: PropTypes.shape({}).isRequired,
  disabled: PropTypes.bool.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
};

export default SelectInput;
