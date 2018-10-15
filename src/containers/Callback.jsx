import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import auth from '../config/Auth';
import { handleAuth } from '../actions/index';


class Callback extends Component {
  componentDidMount() {
    const { handleAuth, history } = this.props;
    auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        handleAuth(authResult, () => {
          history.push('/dashboard');
        });
      } else if (err) {
        history.push('/login');
        console.log(err);
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }
}

Callback.propTypes = {
  handleAuth: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

export default connect(null, { handleAuth })(Callback);
