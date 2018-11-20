import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import ListSelect from '../InputTypes/ListSelect';
import colleges from '../../reducers/QuestionnaireReducers/colleges.json';

const CollegeListSelect = ({
  title,
  id,
  disabled,
  required,
}) => (
  <Field
    label={title}
    validate={[required]}
    name={id}
    options={colleges}
    disabled={disabled}
    component={ListSelect}
  />
);

CollegeListSelect.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  required: PropTypes.func.isRequired,
};


export default CollegeListSelect;
