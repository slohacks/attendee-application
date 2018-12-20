import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import InputType from './InputType';
import { submitResponse } from '../../actions/index';

class Required extends Component {
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
    const { section: { questions }, previousPage } = this.props;
    const { handleSubmit, valid } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          {Required.renderInputs(questions)}
          <Button color="secondary" onClick={previousPage} type="button">
            BACK
          </Button>
          <Button variant="outlined" color="primary" disabled={!valid} type="submit" style={{ marginLeft: '1rem' }}>
            NEXT
          </Button>
        </form>
      </div>
    );
  }
}

Required.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  section: PropTypes.shape({}).isRequired,
  nextPage: PropTypes.func.isRequired,
  submitResponse: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'Required',
  destroyOnUnmount: false,
})(
  connect(null, { submitResponse })(Required),
);
