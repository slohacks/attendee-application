import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import TextInput from '../InputTypes/TextInput';
import SelectInput from '../InputTypes/SelectInput';
import FileInput from '../InputTypes/FileInput';

const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const required = value => (value || typeof value === 'number' ? undefined : 'Required');
const email = value => (!re.test(value) ? 'Invalid Email Address' : '');

const InputType = (props) => {
  function renderFields(question) {
    const { title, id } = question;
    const { disabled } = props;
    switch (question.inputType) {
      case 1:
        return (
          <Field
            label={title}
            disabled={disabled}
            validate={[required, email]}
            name={id}
            component={TextInput}
          />
        );
      case 2:
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
      case 4:
        return (
          <Field
            type="file"
            disabled={disabled}
            label={title}
            validate={[required]}
            name={id}
            component={FileInput}
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
