import React from 'react';
import PropTypes from 'prop-types';

const MultiSelect = (props) => {
  const { mainField, otherField } = props;
  const { label, options, disabled } = props;
  const { [mainField]: { input: mainInput, meta: mainMeta } } = props;
  const { [otherField]: { input: otherInput, meta: otherMeta } } = props;

  function renderOptions() {
    return Object.keys(options).map((option) => { // eslint-disable-line arrow-body-style
      return (
        <option key={option} value={options[option]}>
          {option}
        </option>
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
    <div>
      <label htmlFor="value">
        {label}
      </label>
      <select onChange={updateFields} value={mainInput.value} disabled={disabled}>
        <option />
        {renderOptions()}
      </select>
      {Number(mainInput.value) === (Object.keys(options).length - 1)
        ? (
          <div>
            <input disabled={disabled} {...otherInput} />
            <div className="error-message">
              {otherMeta.touched ? otherMeta.error : ''}
            </div>
          </div>
        ) : null }
      <div className="error-message">
        {mainMeta.touched ? mainMeta.error : ''}
      </div>
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
