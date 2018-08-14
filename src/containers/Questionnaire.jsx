import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import requireAuth from '../components/requireAuth';
import ProgressBar from '../components/Questionnaire/ProgressBar';
import PersonalInfo from '../components/Questionnaire/PersonalInfo';
import BasicInfo from '../components/Questionnaire/BasicInfo';


class Questionaire extends Component {
  constructor() {
    super();
    this.renderNextPage = this.renderNextPage.bind(this);
  }

  renderQuestionSection(id) {
    const { questionSections } = this.props;
    switch (id) {
      case '0':
        return <PersonalInfo nextPage={this.renderNextPage} section={questionSections[id]} />;
      case '1':
        return <BasicInfo nextPage={this.renderNextPage} section={questionSections[id]} />;
      default:
        return (
          <h1>
            Hello World
          </h1>
        );
    }
  }

  renderNextPage() {
    const {
      questionSections: { length },
      match: { params: { id } },
      history: { push },
    } = this.props;

    if ((Number(id) + 1) === length) {
      push('/submission');
    } else {
      push(`/questionnaire/${Number(id) + 1}`);
    }
  }

  render() {
    const { match: { params: { id } } } = this.props;
    return (
      <div>
        <ProgressBar />
        {this.renderQuestionSection(id)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { questionSections: state.questions.body };
}

Questionaire.propTypes = {
  questionSections: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(requireAuth(Questionaire));
