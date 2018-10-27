import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import InputType from './InputType';
import ProgressBar from './ProgressBar';
import { submitApp } from '../../actions/index';

class Submission extends Component {
  submitApplication(form) {
    const { submitApp: submitApplication } = this.props;
    submitApplication(form);
  }

  renderSections() {
    const { questionSections } = this.props;
    return questionSections.map((section) => {
      return (
        <div key={section.name}>
          <h2>
            {section.name}
          </h2>
          {Submission.renderFields(section)}
        </div>
      );
    });
  }

  static renderFields(section) {
    const { questions } = section;
    return questions.map(question => <InputType key={question.id} disabled question={question} />);
  }

  render() {
    const { invalid, handleSubmit } = this.props;
    return (
      <div>
        <ProgressBar />
        <form onSubmit={handleSubmit(this.submitApplication.bind(this))}>
          {this.renderSections()}
          <button type="submit" disabled={invalid}>
            Submit Application
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { questionSections: state.questions.body, responseValues: state.responses };
}

Submission.propTypes = {
  invalid: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  questionSections: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  submitApp: PropTypes.func.isRequired,
};

Submission = reduxForm({
  form: 'Submission Form',
  enableReinitialize: true,
})(
  connect(mapStateToProps, { submitApp })(Submission),
);

Submission = connect(
  state => ({
    initialValues: state.responses,
  }),
)(Submission);

export default Submission;
