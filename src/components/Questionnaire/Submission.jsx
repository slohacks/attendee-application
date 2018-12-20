import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputType from './InputType';
import { submitApp } from '../../actions/index';

class Submission extends Component {
  componentDidUpdate() {
    const { submissionStatus, pushConfirmation } = this.props;
    if (submissionStatus) {
      pushConfirmation('/confirmation');
    }
  }

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
    const {
      valid,
      handleSubmit,
      previousPage,
      loading,
      errorMessage,
    } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.submitApplication.bind(this))} style={{ marginBottom: '1rem' }}>
          {this.renderSections()}
          <Button color="secondary" onClick={previousPage} type="button">
            BACK
          </Button>
          {loading ? <CircularProgress color="primary" /> : (
            <Button variant="contained" color="primary" disabled={!valid} type="submit" style={{ marginLeft: '1rem' }}>
              Submit Application
            </Button>
          )}
        </form>
        {errorMessage ? (
          <FormHelperText error>
            {errorMessage}
          </FormHelperText>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    questionSections: state.questions.body,
    responseValues: state.responses,
    auth: state.auth,
    errorMessage: state.submission.errorMessage,
    loading: state.submission.loading,
    submissionStatus: state.submission.submissionStatus,
  };
}

Submission.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  questionSections: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  submitApp: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
  auth: PropTypes.shape({}).isRequired,
  pushConfirmation: PropTypes.func.isRequired,
  submissionStatus: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
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
