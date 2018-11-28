import React from 'react';
import PropTypes from 'prop-types';
import { Field, Fields } from 'redux-form';
import TextInput from '../InputTypes/TextInput';
import TextArea from '../InputTypes/TextArea';
import TextAdornment from '../InputTypes/TextAdornment';
import SelectInput from '../InputTypes/SelectInput';
import MultiSelect from '../InputTypes/MultiSelect';
import FileInput from '../InputTypes/FileInput';
import CheckInput from '../InputTypes/CheckBox';
import ListSelect from '../InputTypes/ListSelect';
import DateInput from '../InputTypes/DateInput';
import colleges from '../../reducers/QuestionnaireReducers/colleges.json';
import majors from '../../reducers/QuestionnaireReducers/majors.json';

const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const pn = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
const required = value => (value || typeof value === 'number' ? undefined : 'Required');
const email = value => (!re.test(value) ? 'Invalid Email Address' : '');
const phoneNumber = value => (!pn.test(value) ? 'Invalid Phone Number' : '');
const checked = value => (value === 'false' ? 'Required' : '');
const process = (date) => {
  return new Date(date).getTime();
};
const date = value => (!(process(value) >= process('02/01/2019')) ? 'Invalid Graduation Date' : '');

const InputType = (props) => {
  function renderFields(question) {
    const { title, id } = question;
    const { disabled } = props;
    const placeholder = question.placeholder ? question.placeholder : null;
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
              placeholder={placeholder}
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
            placeholder={placeholder}
          />
        );
      case 'textAdornment':
        return (
          <Field
            label={title}
            disabled={disabled}
            name={id}
            adornment={question.adornmentText}
            component={TextAdornment}
          />
        );
      case 'textArea':
        if (question.validate === 'none') {
          return (
            <Field
              label={title}
              disabled={disabled}
              name={id}
              component={TextArea}
            />
          );
        }
        return (
          <Field
            label={title}
            disabled={disabled}
            validate={[required]}
            name={id}
            component={TextArea}
          />
        );
      case 'dropDown':
        if (question.validate === 'checked') {
          return (
            <Field
              label={title}
              disabled={disabled}
              validate={[required, checked]}
              name={id}
              options={question.options}
              component={SelectInput}
            />
          );
        }
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
          <Field
            label={title}
            suggestions={colleges}
            component={ListSelect}
            name={id}
            disabled={disabled}
            validate={[required]}
          />
        );
      case 'majorSelect':
        return (
          <Field
            label={title}
            suggestions={majors}
            component={ListSelect}
            name={id}
            disabled={disabled}
            validate={[required]}
          />
        );
      case 'fileUpload':
        return (
          <Field
            disabled={disabled}
            label={title}
            name={id}
            specs={question.spec}
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
      case 'dateInput':
        return (
          <Field
            label={title}
            disabled={disabled}
            name={id}
            validate={[required, date]}
            component={DateInput}
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
