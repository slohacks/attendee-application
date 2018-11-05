import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({
  input,
  label,
  disabled,
  meta: { touched, error },
}) => (
  <div>
    <label htmlFor="value">
      {label}
      <textarea {...input} disabled={disabled} />
    </label>
    <div className="error-message">
      {touched ? error : ''}
    </div>
  </div>
);
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
