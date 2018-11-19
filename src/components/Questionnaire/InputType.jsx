import React from 'react';
import PropTypes from 'prop-types';
import { Field, Fields } from 'redux-form';
import TextInput from '../InputTypes/TextInput';
import SelectInput from '../InputTypes/SelectInput';
import MultiSelect from '../InputTypes/MultiSelect';
import FileInput from '../InputTypes/FileInput';
import CheckInput from '../InputTypes/CheckBox';
import CollegeListSelect from './CollegeListSelect';

const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const pn = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
const required = value => (value || typeof value === 'number' ? undefined : 'Required');
const email = value => (!re.test(value) ? 'Invalid Email Address' : '');
const phoneNumber = value => (!pn.test(value) ? 'Invalid Phone Number' : '');

const InputType = (props) => {
  function renderFields(question) {
    const { title, id } = question;
    const { disabled } = props;
    switch (question.inputType) {
      case 'textInput':
        if (question.validate === 'none') {
          return (
            <Field
              label={title}
              disabled={disabled}
              name={id}
              component={TextInput}
            />
          );
        }
        if (question.validate === 'email') {
          return (
            <Field
              label={title}
              disabled={disabled}
              validate={[required, email]}
              name={id}
              component={TextInput}
            />
          );
        }
        if (question.validate === 'phoneNumber') {
          return (
            <Field
              label={title}
              disabled={disabled}
              validate={[required, phoneNumber]}
              name={id}
              component={TextInput}
            />
          );
        }
        return (
          <Field
            label={title}
            disabled={disabled}
            validate={[required]}
            name={id}
            component={TextInput}
          />
        );
      case 'dropDown':
        return (
          <Field
            label={title}
            disabled={disabled}
            options={question.options}
            validate={[required]}
            name={id}
            component={SelectInput}
          />
        );
      case 'multiSelect':
        return (
          <Fields
            label={title}
            disabled={disabled}
            options={question.options}
            names={[
              id,
              `other_${id}`,
            ]}
            mainField={id}
            otherField={`other_${id}`}
            component={MultiSelect}
          />
        );
      case 'listSelect':
        return (
          <CollegeListSelect title={title} id={id} disabled={disabled} required={required} />
        );
      case 'fileUpload':
        return (
          <Field
            disabled={disabled}
            label={title}
            validate={[required]}
            name={id}
            component={FileInput}
          />
        );
      case 'checkBox':
        return (
          <Field
            label={title}
            disabled={disabled}
            validate={[required]}
            name={id}
            component={CheckInput}
          />
        );
      default:
        return (
          <Field
            label={title}
            disabled={disabled}
            validate={[required]}
            name={id}
            component={TextInput}
          />
        );
    }
  }

  const { question } = props;
  return (
    <div>
      {renderFields(question)}
    </div>
  );
};

InputType.propTypes = {
  question: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default InputType;
