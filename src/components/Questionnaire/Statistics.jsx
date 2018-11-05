import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import InputType from './InputType';
import { submitResponse } from '../../actions/index';

class Statistics extends Component {
  onSubmit(formProps) {
    const { nextPage, submitResponse: submitAnswers } = this.props;
    submitAnswers(formProps);
    nextPage();
  }

  static renderInputs(questions) {
    return questions.map((question) => {
      return (
        <InputType
          key={question.id}
          disabled={false}
          question={question}
        />
      );
    });
  }

  render() {
    const { section: { questions } } = this.props;
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          {Statistics.renderInputs(questions)}
          <button type="submit">
            Submit!
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.gender) {
    errors.gender = 'Required';
  }

  if (values.gender === '3') {
    if (!values.other_gender) {
      errors.other_gender = 'Cannot be empty';
    }
  }

  if (!values.ethnicity) {
    errors.ethnicity = 'Required';
  }

  if (values.ethnicity === '6') {
    if (!values.other_ethnicity) {
      errors.other_ethnicity = 'Cannot be empty';
    }
  }

  return errors;
}

Statistics.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  section: PropTypes.shape({}).isRequired,
  nextPage: PropTypes.func.isRequired,
  submitResponse: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'Statistics',
  validate,
  destroyOnUnmount: false,
})(
  connect(null, { submitResponse })(Statistics),
);
