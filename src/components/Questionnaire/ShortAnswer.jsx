import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import InputType from './InputType';
import { submitResponse } from '../../actions/index';

class ShortAnswer extends Component {
  onSubmit(formProps) {
    const { nextPage, submitResponse } = this.props; // eslint-disable-line no-shadow
    submitResponse(formProps);
    nextPage();
  }

  static renderInputs(questions) {
    return questions.map((question) => { // eslint-disable-line arrow-body-style
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
          {ShortAnswer.renderInputs(questions)}
          <button type="submit">
            Submit!
          </button>
        </form>
      </div>
    );
  }
}

ShortAnswer.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  section: PropTypes.shape({}).isRequired,
  nextPage: PropTypes.func.isRequired,
  submitResponse: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'Short Answer',
  destroyOnUnmount: false,
})(
  connect(null, { submitResponse })(ShortAnswer),
);
