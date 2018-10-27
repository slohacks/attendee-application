import React from 'react';
import PropTypes from 'prop-types';
import VirtualizedSelect from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';

import 'react-select/dist/react-select.css';
import 'react-virtualized-select/styles.css';

const ListSelect = (props) => {
  const {
    input: { onChange, value },
    label,
    meta: { touched, error },
    options,
    disabled,
  } = props;

  function handleChange(inputValue) {
    if (inputValue) {
      onChange(inputValue.value);
    }
  }
  const filterOptions = createFilterOptions({ options });
  return (
    <div>
      <label>
        {label}
      </label>
      <VirtualizedSelect
        value={value}
        onChange={handleChange}
        options={options}
        filterOptions={filterOptions}
        clearable={false}
        disabled={disabled}
      />
      <div className="error-message">
        {touched ? error : ''}
      </div>
    </div>
  );
};

ListSelect.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  disabled: PropTypes.bool.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
};

export default ListSelect;
