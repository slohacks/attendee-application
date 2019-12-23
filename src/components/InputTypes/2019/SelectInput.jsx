import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class SelectInput extends Component {
  renderChoices() {
    const { choices } = this.props;
    return Object.keys(choices).map((choice) => {
      return (
        <option key={choice} value={choices[choice]}>
          {choice}
        </option>
      );
    });
  }

  render() {
    const {
      input,
      disabled,
      label,
      meta: { touched, error },
    } = this.props;
    const errorExist = touched && Boolean(error);
    return (
      <SelectContainer error={errorExist}>
        {label && <p>{label}</p>}
        <select disabled={disabled} {...input}>
          <option value="" />
          {this.renderChoices()}
        </select>
      </SelectContainer>
    );
  }
}

const SelectContainer = styled.div`
  font-family: 'Proxima Nova';
  select {
    border: 2px solid ${props => (props.error ? 'red' : 'grey')};
    padding: .75rem .5rem;
    margin: .5rem 0;
    background: none;
  }
  p {
    margin: .25rem 0;
  }
`;

SelectInput.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({}).isRequired,
  choices: PropTypes.shape({}).isRequired,
  disabled: PropTypes.bool.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
};

export default SelectInput;
