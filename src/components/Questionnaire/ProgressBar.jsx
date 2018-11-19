import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

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
    const { id } = this.props;
    return (
      <div>
        <Stepper activeStep={Number(id)}>
          {this.renderProgressLinks()}
        </Stepper>
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
