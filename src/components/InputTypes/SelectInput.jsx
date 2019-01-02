import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

class SelectInput extends Component {
  renderOptions() {
    const { options } = this.props;
    return Object.keys(options).map((option) => {
      return (
        <MenuItem key={option} value={options[option]}>
          {option}
        </MenuItem>
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
    const errorExist = touched && Boolean(error);
    return (
      <div
        style={{ marginBottom: '1rem' }}
      >
        <FormControl fullWidth error={errorExist} disabled={disabled}>
          <InputLabel>
            {label}
          </InputLabel>
          <Select {...input}>
            <MenuItem value="" />
            {this.renderOptions()}
          </Select>
          {errorExist ? (
            <FormHelperText>
              {error}
            </FormHelperText>
          ) : '' }
        </FormControl>
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
