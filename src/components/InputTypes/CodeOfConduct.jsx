import React from 'react';
import PropTypes from 'prop-types';
import CheckBox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';

const CodeOfConduct = ({
  input,
  label,
  link,
  linkText,
  disabled,
  meta: { touched, error },
}) => {
  return (
    <div
      style={{ marginBottom: '1rem' }}
    >
      <InputLabel error={touched && Boolean(error)}>
        {label}
        <a href={link} target="_blank" rel="noopener noreferrer">
        {linkText}
        </a>
        ?
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

CodeOfConduct.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({}).isRequired,
  disabled: PropTypes.bool.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
  link: PropTypes.string.isRequired,
};

export default CodeOfConduct;
