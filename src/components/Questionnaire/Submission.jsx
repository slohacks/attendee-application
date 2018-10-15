import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import axios from 'axios';
import InputType from './InputType';
import ProgressBar from './ProgressBar';

class Submission extends Component {
  submitApplication(form) { // eslint-disable-line class-methods-use-this
    const { accessToken } = this.props;
    console.log(accessToken);
    console.log(form);
    axios.post('http://127.0.0.1:8000/applications/', form, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
        console.log(error.response);
      });
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
  return {
    questionSections: state.questions.body,
    responseValues: state.responses,
    accessToken: state.auth.accessToken,
  };
}

Submission.propTypes = {
  invalid: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  questionSections: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  accessToken: PropTypes.string.isRequired,
};

Submission = reduxForm({
  form: 'Submission Form',
  enableReinitialize: true,
})(
  connect(mapStateToProps, null)(Submission),
);

Submission = connect(
  state => ({
    initialValues: state.responses,
  }),
)(Submission);

export default Submission;
