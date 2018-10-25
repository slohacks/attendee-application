import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default (ChildComponent) => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      const { auth } = this.props;
      const { history } = this.props;
      if (!auth) {
        history.push('/login');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }
  function mapStateToProps(state) {
    return { auth: state.auth.authenticated };
  }

  ComposedComponent.propTypes = {
    auth: PropTypes.string.isRequired,
    history: PropTypes.shape().isRequired,
  };

  return connect(mapStateToProps)(ComposedComponent);
};
