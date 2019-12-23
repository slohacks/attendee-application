import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TextInput from './TextInput';
import { ErrorText } from '../../common';

const MultiSelect = (props) => {
  const { mainField, otherField } = props;
  const { label, choices, disabled } = props;
  const { [mainField]: { input: mainInput, meta: mainMeta } } = props;
  const { [otherField]: { input: otherInput, meta: otherMeta } } = props;
  const mainError = Boolean(mainMeta.error) && mainMeta.touched;
  const otherError = Boolean(otherMeta.error) && otherMeta.touched;

  function renderChoices() {
    return Object.keys(choices).map((choice) => {
      return (
        <option key={choice} value={choices[choice]}>
          {choice}
        </option>
      );
    });
  }

  function updateFields(event) {
    mainInput.onChange(event.target.value);
    if (Number(event.target.value) !== (Object.keys(choices).length - 1)) {
      otherInput.onChange(null);
    }
  }

  return (
    <Fragment>
      <MultiSelectContainer>
        {label && <p>{label}</p>}
        <select onChange={updateFields} value={mainInput.value}>
          <option value="" />
          {renderChoices()}
        </select>
        {mainError && <ErrorText>{mainMeta.error}</ErrorText>}
      </MultiSelectContainer>
      {mainInput.value === ('Other') && <TextInput meta={otherMeta} type="text" error={otherError} input={{ ...otherInput }} disabled={disabled} /> }
    </Fragment>
  );
};

const MultiSelectContainer = styled.div`
  font-family: 'Proxima Nova';
  select {
    border: 2px solid ${props => (props.error ? 'red' : 'grey')};
    padding: .75rem .5rem;
    margin: .5rem 0;
    background: none;
  }
  option {
    padding: 1rem 0;
  }

  p {
    margin .25rem 0;
  }

`;

MultiSelect.propTypes = {
  mainField: PropTypes.string.isRequired,
  otherField: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  choices: PropTypes.shape({}).isRequired,
};

export default MultiSelect;
