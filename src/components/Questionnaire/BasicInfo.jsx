import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';

import { QuestionContainer } from '../common';
import InputType from './InputType';
import { submitResponse } from '../../actions/index';

import ProgressBar from './ProgressBar.jsx';

class BasicInfo extends Component {
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
          <QuestionContainer>
            {BasicInfo.renderInputs(questions)}
          </QuestionContainer>
          <Button color="secondary" onClick={previousPage} type="button">
            BACK
          </Button>
          <Button variant="outlined" color="primary" disabled={!valid} type="submit" style={{ marginLeft: '1rem' }}>
            NEXT
          </Button>
        </form>
        <ProgressBar percentage={this.props.percentage}/>
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

  if (!values.pronouns) {
    errors.ethnicity = 'Required';
  }

  if (values.pronouns === 'Other') {
    if (!values.other_pronouns) {
      errors.other_pronouns = 'Cannot be empty';
    }
  }

  return errors;
}

BasicInfo.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  section: PropTypes.shape({}).isRequired,
  nextPage: PropTypes.func.isRequired,
  submitResponse: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'Basic Info',
  validate,
  destroyOnUnmount: false,
})(
  connect(null, { submitResponse })(BasicInfo),
);
