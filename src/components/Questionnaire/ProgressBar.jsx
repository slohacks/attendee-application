import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProgressBar extends Component {
  renderProgressLinks() {
    const { questionSections } = this.props;
    return questionSections.map((section) => {
      return (
        <Link key={section.id} to={`/questionnaire/${section.id}`}>
          {section.name}
        </Link>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderProgressLinks()}
        <Link to="/submission">
          Submission
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { questionSections: state.questions.body };
}

ProgressBar.propTypes = {
  questionSections: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps, null)(ProgressBar);
