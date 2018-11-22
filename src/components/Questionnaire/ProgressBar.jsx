import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MobileStepper from '@material-ui/core/MobileStepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import './ProgressBar.css';

class ProgressBar extends Component {
  renderProgressLinks() {
    const { questionSections, id } = this.props;
    return questionSections.map((section) => {
      if (section.id.toString() === id) {
        return (
          <Step key={section.id}>
            <StepLabel>
              {section.name}
            </StepLabel>
          </Step>
        );
      }
      return (
        <Step key={section.id}>
          <StepLabel>
            {section.name}
          </StepLabel>
        </Step>
      );
    });
  }

  render() {
    const { id, questionSections: { length } } = this.props;
    return (
      <div>
        <MobileStepper className="ProgressBar" position="static" variant="progress" steps={length} activeStep={Number(id)} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { questionSections: state.questions.body };
}

ProgressBar.propTypes = {
  questionSections: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  id: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(ProgressBar);
