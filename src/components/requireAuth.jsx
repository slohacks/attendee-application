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
      const { accessToken, userToken, expiresAt } = this.props;
      const { history } = this.props;
      if (!accessToken || !userToken) {
        history.push('/login');
      } else if (new Date().getTime() > expiresAt) {
        history.push('/login');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }
  function mapStateToProps(state) {
    return {
      userToken: state.auth.userToken,
      accessToken: state.auth.accessToken,
      expiresAt: state.auth.expiresAt,
    };
  }

  ComposedComponent.propTypes = {
    userToken: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
    history: PropTypes.shape().isRequired,
  };

  return connect(mapStateToProps)(ComposedComponent);
};
