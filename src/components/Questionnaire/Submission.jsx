import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import InputType from './InputType';
import { submitApp } from '../../actions/index';

class Submission extends Component {
  submitApplication(form) {
    const { submitApp: submitApplication, auth } = this.props;
    submitApplication(auth.user, form);
  }

  renderSections() {
    const { questionSections } = this.props;
    return questionSections.map((section) => {
      if (section.id !== questionSections.length - 1) {
        return (
          <div key={section.name}>
            <h2>
              {section.name}
            </h2>
            {Submission.renderFields(section)}
          </div>
        );
      }
    });
  }

  static renderFields(section) {
    const { questions } = section;
    return questions.map(question => <InputType key={question.id} disabled question={question} />);
  }

  render() {
    const { valid, handleSubmit, previousPage } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.submitApplication.bind(this))}>
          {this.renderSections()}
          <Button color="secondary" onClick={previousPage} type="button">
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

function mapStateToProps(state) {
  return {
    questionSections: state.questions.body,
    responseValues: state.responses,
    auth: state.auth,
  };
}

Submission.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  questionSections: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  submitApp: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
  auth: PropTypes.shape({}).isRequired,
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
