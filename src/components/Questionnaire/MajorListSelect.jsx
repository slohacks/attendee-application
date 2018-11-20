import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import ListSelect from '../InputTypes/ListSelect';
import majors from '../../reducers/QuestionnaireReducers/majors.json';

const MajorListSelect = ({
  title,
  id,
  disabled,
  required,
}) => (
  <Field
    label={title}
    validate={[required]}
    name={id}
    options={majors}
    disabled={disabled}
    component={ListSelect}
  />
);

MajorListSelect.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  required: PropTypes.func.isRequired,
};

export default MajorListSelect;
