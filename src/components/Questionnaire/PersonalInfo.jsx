import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

import { QuestionnairePage } from '../common';
import { SectionHeaderContainer } from '../../styled/containers';
import { SectionHeader, SectionText } from '../../styled/headers';
import InputType from './InputType';
import { submitResponse } from '../../actions/index';
import ProgressBar from './ProgressBar.jsx';

class PersonalInfo extends Component {
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
      <QuestionnairePage>
        <SectionHeaderContainer>
          <SectionHeader>Tell me about yourself!</SectionHeader>
          <SectionText>Let&apos;s start by answering a couple of questions!</SectionText>
        </SectionHeaderContainer>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <QuestionContainer>
            {PersonalInfo.renderInputs(questions)}
          </QuestionContainer>
          <div>
            <Button color="secondary" onClick={previousPage} type="button">
              BACK
            </Button>
            <Button variant="outlined" color="primary" disabled={!valid} type="submit" style={{ marginLeft: '1rem' }}>
              NEXT
            </Button>
          </div>
        </form>
        <ProgressBar percentage={this.props.percentage}/>
      </QuestionnairePage>
    );
  }
}

const QuestionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  grid-column-gap: 2rem;
`;

PersonalInfo.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  section: PropTypes.shape({}).isRequired,
  nextPage: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  submitResponse: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'Personal Info',
  destroyOnUnmount: false,
})(
  connect(null, { submitResponse })(PersonalInfo),
);
