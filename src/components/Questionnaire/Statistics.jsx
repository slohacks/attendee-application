import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import InputType from './InputType';
import { submitResponse } from '../../actions/index';

class Statistics extends Component {
  onSubmit(formProps) {
    const { nextPage, submitResponse: submitForm } = this.props;
    submitForm(formProps);
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
    const { section: { questions }, previousPage } = this.props;
    const { handleSubmit, valid } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          {Statistics.renderInputs(questions)}
          <Button variant="contained" color="secondary" onClick={previousPage} type="button">
            BACK
          </Button>
          <Button variant="contained" color="primary" disabled={!valid} type="submit">
            NEXT
          </Button>
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

  if (values.gender === 'Other') {
    if (!values.other_gender) {
      errors.other_gender = 'Cannot be empty';
    }
  }

  if (!values.ethnicity) {
    errors.ethnicity = 'Required';
  }

  if (values.ethnicity === 'Other') {
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
  previousPage: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'Statistics',
  validate,
  destroyOnUnmount: false,
})(
  connect(null, { submitResponse })(Statistics),
);
