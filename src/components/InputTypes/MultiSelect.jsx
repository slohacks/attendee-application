import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';

const MultiSelect = (props) => {
  const { mainField, otherField } = props;
  const { label, options, disabled } = props;
  const { [mainField]: { input: mainInput, meta: mainMeta } } = props;
  const { [otherField]: { input: otherInput, meta: otherMeta } } = props;
  const mainError = Boolean(mainMeta.error) && mainMeta.touched;
  const otherError = Boolean(otherMeta.error) && otherMeta.touched;

  function renderOptions() {
    return Object.keys(options).map((option) => {
      return (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      );
    });
  }

  function updateFields(event) {
    mainInput.onChange(event.target.value);
    if (Number(event.target.value) !== (Object.keys(options).length - 1)) {
      otherInput.onChange(null);
    }
  }

  return (
    <div
      style={{ marginBottom: '1rem' }}
    >
      <FormControl fullWidth error={(mainError)} disabled={disabled}>
        <InputLabel>
          {label}
        </InputLabel>
        <Select onChange={updateFields} value={mainInput.value}>
          <MenuItem value="" />
          {renderOptions()}
        </Select>
        {mainInput.value === ('Other')
          ? (
            <TextField fullWidth label={label} helperText={otherMeta.touched && otherError ? otherMeta.error : ''} error={otherError} {...otherInput} disabled={disabled} />
          ) : null }
        {mainError ? (
          <FormHelperText>
            {mainMeta.error}
          </FormHelperText>
        ) : ''}
      </FormControl>
    </div>
  );
};

MultiSelect.propTypes = {
  mainField: PropTypes.string.isRequired,
  otherField: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  options: PropTypes.shape({}).isRequired,
};

export default MultiSelect;
