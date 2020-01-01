import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import requireAuth from '../components/requireAuth';
import PersonalInfo from '../components/Questionnaire/PersonalInfo';
import BasicInfo from '../components/Questionnaire/BasicInfo';
import ShortAnswer from '../components/Questionnaire/ShortAnswer';
import Statistics from '../components/Questionnaire/Statistics';
import Submission from '../components/Questionnaire/Submission';
import Miscellaneous from '../components/Questionnaire/Miscellaneous';
import Required from '../components/Questionnaire/Required';

class Questionnaire extends Component {
  constructor() {
    super();
    this.renderNextPage = this.renderNextPage.bind(this);
    this.renderPreviousPage = this.renderPreviousPage.bind(this);
  }

  renderQuestionSection(id) {
    const { questionSections, history: { push } } = this.props;
    const numPages = 7;
    switch (id) {
      case '0':
        return (
          <PersonalInfo
            previousPage={this.renderPreviousPage}
            nextPage={this.renderNextPage}
            section={questionSections[id]}
            percentage={(parseInt(id, 10) + 1) / numPages}
          />
        );
      case '1':
        return (
          <BasicInfo
            previousPage={this.renderPreviousPage}
            nextPage={this.renderNextPage}
            section={questionSections[id]}
            percentage={(parseInt(id, 10) + 1) / numPages}
          />
        );
      case '2':
        return (
          <ShortAnswer
            previousPage={this.renderPreviousPage}
            nextPage={this.renderNextPage}
            section={questionSections[id]}
            percentage={(parseInt(id, 10) + 1) / numPages}
          />
        );
      case '3':
        return (
          <Statistics
            previousPage={this.renderPreviousPage}
            nextPage={this.renderNextPage}
            section={questionSections[id]}
            percentage={(parseInt(id, 10) + 1) / numPages}
          />
        );
      case '4':
        return (
          <Miscellaneous
            previousPage={this.renderPreviousPage}
            nextPage={this.renderNextPage}
            section={questionSections[id]}
            percentage={(parseInt(id, 10) + 1) / numPages}
          />
        );
      case '5':
        return (
          <Required
            previousPage={this.renderPreviousPage}
            nextPage={this.renderNextPage}
            section={questionSections[id]}
            percentage={(parseInt(id, 10) + 1) / numPages}
          />
        );
      case '6':
        return (
          <Submission
            previousPage={this.renderPreviousPage}
            pushConfirmation={push}
            percentage={(parseInt(id, 10) + 1) / numPages}
          />
        );
      default:
        return (
          <p>
            Default
          </p>
        );
    }
  }

  renderPreviousPage() {
    const {
      match: { params: { id } },
      history: { push },
    } = this.props;

    if (Number(id) === 0) {
      push('/dashboard');
    } else {
      push(`/questionnaire/${Number(id) - 1}`);
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
      <QuestionnaireWrapper>
        {this.renderQuestionSection(id)}
      </QuestionnaireWrapper>
    );
  }
}

const QuestionnaireWrapper = styled.div`
  width: 100%;
`;

function mapStateToProps(state) {
  return {
    questionSections: state.questions.body,
    completedApp: state.auth.completedApplication,
    user: state.auth.user,
  };
}

Questionnaire.propTypes = {
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

export default connect(mapStateToProps, null)(requireAuth(Questionnaire));
