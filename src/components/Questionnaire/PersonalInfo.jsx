import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import InputType from './InputType';
import { submitResponse } from '../../actions/index';

class PersonalInfo extends Component {
  onSubmit(formProps) {
    const { nextPage, submitResponse } = this.props;
    submitResponse(formProps);
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
          {PersonalInfo.renderInputs(questions)}
          <button type="submit">
            Submit!
          </button>
        </form>
      </div>
    );
  }
}

PersonalInfo.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  section: PropTypes.shape({}).isRequired,
  nextPage: PropTypes.func.isRequired,
  submitResponse: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'Personal Info',
  destroyOnUnmount: false,
})(
  connect(null, { submitResponse })(PersonalInfo),
);
